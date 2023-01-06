function addZeros(val) {
    val = val.toString()
    if (val.length == 1) return "0" + val;
    return val;
}

function getValue(id, conditions) {
    conditions.push([]);
    let index = conditions.length - 1;
    let value = document.getElementById(id).value;
    if (value != "") {
        conditions[index].push(addZeros(value));
    }
    else return conditions;

    let value2 = document.getElementById(id + "2").value;
    if (value2 != "") {
        if (value2 < value) {
            alert("Špatné rozmezí :(");
        }
        else {
            for (let i = value+1; i <= value2; i++) {
                conditions[index].push(addZeros(i));
            }
        }
    }
    return conditions;
}

function change() {
    let conditions = [];

    conditions = getValue("yearInp", conditions);
    conditions = getValue("monthInp", conditions);
    conditions = getValue("dayInp", conditions);
    conditions = getValue("hourInp", conditions);
    conditions = getValue("minuteInp", conditions);            

    let rets = getLists(data, 0, "", conditions);
    rets[1] = reworkTimes(rets[1]);
    if (rets[0].length == 0) {
        alert("Nebyly nalezeny žádné údaje :(");
    }
    else {
        drawChart(rets[1], rets[0]);
    }
}

function setDefault() {
    document.getElementById("yearInp").value = "";
    document.getElementById("yearInp2").value = "";

    document.getElementById("monthInp").value = "";
    document.getElementById("monthInp2").value = "";
    
    document.getElementById("dayInp").value = "";
    document.getElementById("dayInp2").value = "";
    
    document.getElementById("hourInp").value = "";
    document.getElementById("hourInp2").value = "";
    
    document.getElementById("minuteInp").value = "";
    document.getElementById("minuteInp2").value = "";
}