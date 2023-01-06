import requests
import os
import json
import datetime
from bs4 import BeautifulSoup

def get_soup() -> BeautifulSoup:
    """Get html from ntk website. If request fail `None` is returned"""
    res = requests.get("https://www.techlib.cz/cs/", timeout=60)
    if (res.status_code != 200):
        return None
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

def prepare_date() -> dict:
    """
    Gets now datetime and returns dict with values 
    of datetime as strings
    """
    date = datetime.datetime.now()
    return {
        "Y": str(date.year)[2:],
        "M": add_zeros(date.month),
        "D": add_zeros(date.day),
        "H": add_zeros(date.hour)
    }

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

    if (date["Y"] not in data):
        data[date["Y"]] = {}
    if (date["M"] not in data[date["Y"]]):
        data[date["Y"]][date["M"]] = {}
    if (date["D"] not in data[date["Y"]][date["M"]]):
        data[date["Y"]][date["M"]][date["D"]] = {}
    if (date["H"] not in data[date["Y"]][date["M"]][date["D"]]):
        data[date["Y"]][date["M"]][date["D"]][date["H"]] = []
    
    data[date["Y"]][date["M"]][date["D"]][date["H"]].append(capture_count)

    data = str(data).replace('\'', '\"')
    with open(data_path, "w", encoding="utf-8") as f:
        f.write(f"var data = {data}")

count = get_count(get_soup())
save(count)


