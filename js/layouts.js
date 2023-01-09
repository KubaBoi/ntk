
/**
 * Create html element select (is filled with options)
 */
function buildLayoutSelect() {
    let select = document.getElementById("layoutsInp");
    for (let i = 0; i < layouts.length; i++) {
        let option = document.createElement("option");
        option.value = i;
        option.innerHTML = layouts[i].name;
        select.appendChild(option);
    }
    changeLayout();
}

/**
 * Called after changed layout by user
 */
function changeLayout() {
    let value = document.getElementById("layoutsInp").value;
    let layout = layouts[value];
    
    document.getElementById("yearInp").value = layout.values.year;
    document.getElementById("yearInp2").value = layout.values.year2;

    document.getElementById("monthInp").value = layout.values.month;
    document.getElementById("monthInp2").value = layout.values.month2;
    
    document.getElementById("dayInp").value = layout.values.day;
    document.getElementById("dayInp2").value = layout.values.day2;
    
    document.getElementById("hourInp").value = layout.values.hour;
    document.getElementById("hourInp2").value = layout.values.hour2;
    
    document.getElementById("minuteInp").value = layout.values.minute;
    document.getElementById("minuteInp2").value = layout.values.minute2;

    change();
}

var today = new Date();

var hoursBack5 = new Date();
hoursBack5.setHours(hoursBack5.getHours() - 5);
var hoursBack10 = new Date();
hoursBack10.setHours(hoursBack10.getHours() - 10);
var yesterday = new Date();
yesterday.setDate(yesterday.getDate()-1);
var daysBack7 = new Date();
daysBack7.setDate(daysBack7.getDate() - 7);
var daysBack30 = new Date();
daysBack30.setDate(daysBack30.getDate() - 30);


var layouts = [
    {
        "name": "Dnes",
        "values": {
            "year": addZeros(today.getFullYear()),
            "year2": "",
            "month": addZeros(today.getMonth() + 1),
            "month2": "",
            "day": addZeros(today.getDate()),
            "day2": "",
            "hour": "",
            "hour2": "",
            "minute": "",
            "minute2": ""
        }
    },
    {
        "name": "Včera",
        "values": {
            "year": addZeros(yesterday.getFullYear()),
            "year2": "",
            "month": addZeros(yesterday.getMonth() + 1),
            "month2": "",
            "day": addZeros(yesterday.getDate()),
            "day2": "",
            "hour": "",
            "hour2": "",
            "minute": "",
            "minute2": ""
        }
    },
    {
        "name": "Posledních 5 hodin",
        "values": {
            "year": addZeros(hoursBack5.getFullYear()),
            "year2": addZeros(today.getFullYear()),
            "month": addZeros(hoursBack5.getMonth() + 1),
            "month2": addZeros(today.getMonth() + 1),
            "day": addZeros(hoursBack5.getDate()),
            "day2": addZeros(today.getDate()),
            "hour": addZeros(hoursBack5.getHours()),
            "hour2": addZeros(today.getHours()),
            "minute": "",
            "minute2": ""
        }
    },
    {
        "name": "Posledních 10 hodin",
        "values": {
            "year": addZeros(hoursBack10.getFullYear()),
            "year2": addZeros(today.getFullYear()),
            "month": addZeros(hoursBack10.getMonth() + 1),
            "month2": addZeros(today.getMonth() + 1),
            "day": addZeros(hoursBack10.getDate()),
            "day2": addZeros(today.getDate()),
            "hour": addZeros(hoursBack10.getHours()),
            "hour2": addZeros(today.getHours()),
            "minute": "",
            "minute2": ""
        }
    },
    {
        "name": "Posledních 7 dní",
        "values": {
            "year": addZeros(daysBack7.getFullYear()),
            "year2": addZeros(today.getFullYear()),
            "month": addZeros(daysBack7.getMonth() + 1),
            "month2": addZeros(today.getMonth() + 1),
            "day": addZeros(daysBack7.getDate()),
            "day2": addZeros(today.getDate()),
            "hour": "",
            "hour2": "",
            "minute": "",
            "minute2": ""
        }
    },
    {
        "name": "Posledních 30 dní",
        "values": {
            "year": addZeros(daysBack30.getFullYear()),
            "year2": addZeros(today.getFullYear()),
            "month": addZeros(daysBack30.getMonth() + 1),
            "month2": addZeros(today.getMonth() + 1),
            "day": addZeros(daysBack30.getDate()),
            "day2": addZeros(today.getDate()),
            "hour": "",
            "hour2": "",
            "minute": "",
            "minute2": ""
        }
    },
    {
        "name": "Žádný",
        "values": {
            "year": "",
            "year2": "",
            "month": "",
            "month2": "",
            "day": "",
            "day2": "",
            "hour": "",
            "hour2": "",
            "minute": "",
            "minute2": ""
        }
    },
]