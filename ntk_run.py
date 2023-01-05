import requests
import time
import os
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
    
def save(capture_count: int, capture_time: int) -> None:
    """
    Saves data as json into file data.json
    
    `capture_count` is the value

    `capture_time` is unix time taken before the request is send
    """
    path = os.path.abspath(os.path.dirname(__file__))
    data_path = os.path.join(path, "data.js")

    with open(data_path, "r", encoding="utf-8") as f:
        data = f.read().replace("}", "")

    with open(data_path, "w", encoding="utf-8") as f:
        f.write(f"{data},{capture_time}:{capture_count}" + "}")

tm = int(time.time())
count = get_count(get_soup())
save(count, tm)

print(tm)


