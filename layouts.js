
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
}

var today = new Date();
var yesterday = new Date();
yesterday.setDate(yesterday.getDate()-1);


var layouts = [
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
            "year": "",
            "year2": "",
            "month": "",
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
        "name": "Posledních 10 hodin",
        "values": {
            "year": (today.getFullYear() - 2000).toString(),
            "year2": "",
            "month": addZeros(today.getMonth()),
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
        "name": "Posledních 7 dní",
        "values": {
            "year": (today.getFullYear() - 2000).toString(),
            "year2": "",
            "month": addZeros(today.getMonth()),
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
        "name": "Posledních 30 dní",
        "values": {
            "year": (today.getFullYear() - 2000).toString(),
            "year2": "",
            "month": addZeros(today.getMonth()),
            "month2": "",
            "day": addZeros(today.getDate()),
            "day2": "",
            "hour": "",
            "hour2": "",
            "minute": "",
            "minute2": ""
        }
    },
]