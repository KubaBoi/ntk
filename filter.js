
function day() {
    var date = getNow();

    let startIndex = -1;
    let endIndex = 0;
    for (let i = 0; i < times.length; i++) {
        var tempDate = getDate(times[i]);
        if (tempDate.getDate() == date.getDate() &&
            tempDate.getMonth() == date.getMonth() &&
            tempDate.getFullYear() == date.getFullYear()) {
            if (startIndex == -1) startIndex = i;
            endIndex = i;
        }
    }
    return [startIndex, endIndex + 1];
}

function month() {
    var date = getNow();

    let startIndex = -1;
    let endIndex = 0;
    for (let i = 0; i < times.length; i++) {
        var tempDate = getDate(times[i]);
        if (tempDate.getMonth() == date.getMonth() &&
            tempDate.getFullYear() == date.getFullYear()) {
            if (startIndex == -1) startIndex = i;
            endIndex = i;
        }
    }
    return [startIndex, endIndex + 1];
}

function year() {
    var date = getNow();

    let startIndex = -1;
    let endIndex = 0;
    for (let i = 0; i < times.length; i++) {
        var tempDate = getDate(times[i]);
        if (tempDate.getFullYear() == date.getFullYear()) {
            if (startIndex == -1) startIndex = i;
            endIndex = i;
        }
    }
    return [startIndex, endIndex + 1];
}