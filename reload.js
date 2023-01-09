function reloadData() {
    let now = new Date();
    if ((now.getMinutes() - 2) % 10 == 0) {
        getData();
    }
}

async function getData() {
    let response = await callEndpoint("GET", "data.json");
    if (response != data) {
        data = response;
        change();
        setActualization();
    }
}

function setActualization() {
    var last = findLast(data);

    var label = document.getElementById("actCount");
    label.innerHTML = last[0];

    var label2 = document.getElementById("lastUpdate");
    label2.innerHTML = reworkTime(last[1]);
}


setInterval(reloadData, 20000);