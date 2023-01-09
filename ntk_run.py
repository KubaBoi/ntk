import requests
import time
import subprocess
import os
import json
import datetime
import uuid
from bs4 import BeautifulSoup

from src.repair_data import repair_data
from src.config import config

def get_soup() -> BeautifulSoup:
    """Get html from ntk website. If request fail exception raised"""
    res = requests.get("https://www.techlib.cz/cs/", timeout=60)
    if (res.status_code != 200):
        raise Exception("Error while request.", res.status_code)
    return BeautifulSoup(res.content, "html.parser")

def get_count(soup: BeautifulSoup) -> int:
    """Find count of people in ntk from html"""
    div = soup.find("div", class_="panel-body text-center lead")
    span = div.find("span")
    return int(span.contents[0].strip())

def add_zeros(val: int) -> str:
    """Add zeros before number if need"""
    val = str(val)
    return (2 - len(val))*"0" + val

def prepare_date() -> list:
    """
    Gets now datetime and returns list with values 
    of datetime as strings
    """
    date = datetime.datetime.now() + datetime.timedelta(hours=1)
    return [
        str(date.year)[2:],
        add_zeros(date.month),
        add_zeros(date.day),
        add_zeros(date.hour)
    ]

def add_to_json(data, keys, value, step=0):
    """
    Prepare json data
    
    `keys` date keys

    `value` value which is added into `data`
    
    `step` iteration of recursion
    """
    key = keys[step]
    if (key not in data):
        if (step < 3):
            data[key] = {}
        else:
            data[key] = []
    if (step < 3):
        data[key], minute = add_to_json(data[key], keys, value, step+1)
        return data, minute
    else:
        data[key].append(value)
        minute = len(data[key]) - 1
        return data, minute


def save(capture_count: int) -> None:
    """
    Saves data as json into file data.json
    
    `capture_count` is the value
    """
    path = os.path.abspath(os.path.dirname(__file__))
    data_path = os.path.join(path, "data.json")

    with open(data_path, "r", encoding="utf-8") as f:
        data = json.loads(f.read())
    
    date = prepare_date()
    data["values"], minute = add_to_json(data["values"], date, capture_count)
    data["values"] = repair_data.repair(data["values"], date)
    
    minute = add_zeros(minute * config.CHECK_MINUTES)
    data["last_update"] = f"{date[2]}.{date[1]}.{date[0]} {date[3]}:{minute}"
    data["last_update_value"] = capture_count

    if (data["global_max_value"] < capture_count):
        data["global_max_value"] = capture_count
        data["global_max"] = data["last_update"]

    data = json.dumps(data, sort_keys=True).replace('\'', '\"')
    with open(data_path, "w", encoding="utf-8") as f:
        f.write(data)

def hash_mac(s):
    """Return hash of string"""
    h = 0
    for i in s:
        h += ord(i)
    return h

def is_debug():
    """
    Compare device mac with mac-hash of my personal server.
    If script is runned not-on my server, than it would return True.
    """
    mac = str(uuid.getnode())
    return config.MAC_HASH != hash_mac(mac)

DEBUG = is_debug()
if (DEBUG):
    print("Debug mode")

while (True):
    print("Checking...")
    if (DEBUG or datetime.datetime.now().minute % config.CHECK_MINUTES == 0):
        try:
            if (not DEBUG): 
                print("Pull...")
                subprocess.call(["git", "pull"])
            print("Scraping...")
            try:
                count = get_count(get_soup())
            except Exception as e:
                print("getCount error:", e)
                count = 0
            save(count)
            if (not DEBUG): 
                print("Add...")
                subprocess.call(["git", "add", "*"])
                print("Commit...")
                subprocess.call(["git", "commit", "-m 'Auto Update'"])
                print("Push...")
                subprocess.call(["git", "push"])
                print("Waiting 3 minutes...")
            else:
                break
        except Exception as e:
            print(e)
        time.sleep(180)
    time.sleep(2)


