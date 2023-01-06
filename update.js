/**
 * Add zero before one character number and remove first two digits
 * if number is length 4
 * @param {integer} val 
 * @returns {string}
 */
function addZeros(val) {
    val = val.toString()
    if (val.length == 1) return "0" + val;
    if (val.length == 4) return val[2] + val[3];
    return val;
}

/**
 * Find values from filter and creates conditions
 * @param {string} id 
 * @param {Array} conditions 
 * @returns {Array}
 */
function getValue(id, conditions) {
    conditions.push([]);
    let index = conditions.length - 1;
    let value = document.getElementById(id).value;
    if (value != "") {
        conditions[index].push(addZeros(value));
    }
    else return conditions;

    // finding range
    let value2 = document.getElementById(id + "2").value;
    if (value2 != "") {
        let watchdog = 0;
        value = parseInt(value);
        value2 = parseInt(value2);
        while (value != value2) {
            switch (id) {
                case "minuteInp":
                    value = addMinute(value);
                    break;
                case "hourInp":
                    value = addHour(value);
                    break;
                case "dayInp":
                    value = addDay(value);
                    break;
                case "monthInp":
                    value = addMonth(value);
                    break;
                default:
                    if (value < value2) value++;
                    else value--;
            }
            conditions[index].push(addZeros(value));
            if (watchdogCatch(watchdog++, getValue)) break;
        }
    }
    return conditions;
}

/**
 * Do the chart update
 */
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

/**
 * Setting default filter values
 */
function setDefault() {
    document.getElementById("layoutsInp").value = "0";

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