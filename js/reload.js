
/**
 * Reload data every 10th minute
 * @param {*} force - reload even if it is not 10th minute
 */
function reloadData(force=false) {
    let now = new Date();
    if ((now.getMinutes() - 2) % 10 == 0 || force) {
        getData();
    }
}

/**
 * Call GET request for data
 * if data are updated then update charts and header
 */
async function getData() {
    let response = await callEndpoint("GET", "data.json");
    if (response.last_update != lastUpdate) {
        lastUpdate = response.last_update;
        lastUpdateValue = response.last_update_value;
        globalMax = response.global_max;
        data = response.values;
        setActualization();
        buildLayoutSelect();
    }
    else {
        console.log("Data are actual")
    }
}

/**
 * Update header
 */
function setActualization() {
    var label = document.getElementById("actCount");
    label.innerHTML = lastUpdateValue;

    var label2 = document.getElementById("lastUpdate");
    label2.innerHTML = lastUpdate;
}