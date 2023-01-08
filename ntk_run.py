import requests
import time
import subprocess
import os
import json
import datetime
import uuid
from bs4 import BeautifulSoup

from repair_data import repair_data

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

def add_to_json(data, keys, step, value):
    """Prepare json data"""
    key = keys[step]
    if (key not in data):
        if (step < 3):
            data[key] = {}
        else:
            data[key] = []
    if (step < 3):
        data[key] = add_to_json(data[key], keys, step+1, value)
        return data
    else:
        data[key].append(value)
        return data


def save(capture_count: int) -> None:
    """
    Saves data as json into file data.json
    
    `capture_count` is the value
    """
    path = os.path.abspath(os.path.dirname(__file__))
    data_path = os.path.join(path, "data.js")

    with open(data_path, "r", encoding="utf-8") as f:
        data = json.loads(f.read().replace("var data = ", ""))
    
    date = prepare_date()
    data = add_to_json(data, date, 0, capture_count)
    data = repair_data.repair(data, date)

    data = json.dumps(data, sort_keys=True).replace('\'', '\"')
    with open(data_path, "w", encoding="utf-8") as f:
        f.write(f"var data = {data}")

def hash(s):
    """Return hash of string"""
    h = 0
    for i in s:
        h += ord(i)
    return h

def isDebug():
    """
    Compare device mac with mac-hash of my personal server.
    If script is runned not-on my server, than it would return True.
    """
    mac = str(uuid.getnode())
    mac_hash = 619
    return mac_hash != hash(mac)

DEBUG = isDebug()
if (DEBUG):
    print("Debug mode")

while (True):
    print("Checking...")
    if (DEBUG or datetime.datetime.now().minute % 10 == 0):
        try:
            print("Pull...")
            if (not DEBUG): subprocess.call(["git", "pull"])
            print("Scraping...")
            try:
                count = get_count(get_soup())
            except Exception as e:
                print("getCount error:", e)
                count = 0
            save(count)
            print("Add...")
            if (not DEBUG): subprocess.call(["git", "add", "*"])
            print("Commit...")
            if (not DEBUG): subprocess.call(["git", "commit", "-m 'Auto Update'"])
            print("Push...")
            if (not DEBUG): subprocess.call(["git", "push"])
            print("Waiting 3 minutes...")
        except Exception as e:
            print(e)
        time.sleep(180)
    time.sleep(20)


