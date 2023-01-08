function reloadData() {
    let now = new Date();
    if ((now.getMinutes() - 1) % 10 == 0) {
        rel();
    }
}

function rel(timeout=500) {
    let elem = document.querySelector("#scriptId");
    elem.remove();
    elem = document.createElement("script");
    elem.id = "scriptId";
    elem.src = "./data.js";
    let head = document.getElementsByTagName("head")[0];
    head.appendChild(elem);
    setTimeout(change, timeout);
    setTimeout(setActualization());
}

function setActualization() {
    var last = findLast(data);

    var label = document.getElementById("actCount");
    label.innerHTML = last[0];

    var label2 = document.getElementById("lastUpdate");
    label2.innerHTML = reworkTime(last[1]);
}


setInterval(reloadData, 20000);