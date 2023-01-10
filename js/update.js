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
 * @param {Object} func 
 * @param {Array} conditions 
 * @returns {Array}
 */
function getValue(func, conditions) {
    conditions.push([]);
    let index = conditions.length - 1;
    let value = document.getElementById(`${func[0]}Inp`).value;
    if (value != "") {
        conditions[index].push(addZeros(value));
    }
    else return conditions;

    // finding range
    let value2 = document.getElementById(`${func[0]}Inp` + "2").value;
    if (value2 != "") {
        conditions[index] = conditions[index].concat(findRange(func, value, value2));
    }
    return conditions;
}

/**
 * Find range between value1 and value2
 * @param {Object} func
 * @param {Integer} value1 
 * @param {Integer} value2 
 * @returns {Array}
 */
function findRange(func, value1, value2) {
    let arr = [];
    let watchdog = 0;
    value1 = parseInt(value1);
    value2 = parseInt(value2);
    while (value1 != value2) {
        value1 = func[1](value1);
        arr.push(addZeros(value1));
        if (watchdogCatch(watchdog++, findRange)) break;
    }
    return arr;
}

/**
 * Do the chart update
 */
function change() {
    offSetChangeAll();
    let conditions = [];
    let functions = [
        ["year", addYear],
        ["month", addMonth], 
        ["day", addDay],
        ["hour", addHour],
        ["minute", addMinute]
    ];

    for (let i = 0; i < functions.length; i++) {
        conditions = getValue(functions[i], conditions);
    }    

    let rets = getLists(data, conditions);
    let labels = [...rets[1]];
    let dataSets = [];
    dataSets.push([...rets[0]]);
    labels = reworkTimes(labels);
    if (labels.length == 0) {
        alert("Nebyly nalezeny žádné údaje :(");
    }
    else {
        for (let i = 0; i < offSets.length; i++) {
            let ofs = offSets[i];
            if (!ofs.active) continue;

            let newConds = [];
            for (let i = 0; i < conditions.length; i++) {
                newConds.push([...conditions[i]]);
            }
            for (let i = 0; i < newConds[ofs.metric].length; i++) {
                let val = parseInt(newConds[ofs.metric][i]);
                val = functions[ofs.metric][1](val, ofs.value * -1);
                newConds[ofs.metric][i] = addZeros(val);
            }
            rets = getLists(data, newConds);
            dataSets.push([...rets[0]]);
        }
        drawChart(labels, ...dataSets);
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