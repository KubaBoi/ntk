
function day() {
    var date = new Date();

    let startIndex = -1;
    let endIndex = 0;
    for (let i = 0; i < times.length; i++) {
        var tempDate = new Date(times[i] * 1000);
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
    var date = new Date();

    let startIndex = 0;
    let endIndex = 0;
    for (let i = 0; i < times.length; i++) {
        var tempDate = new Date(times[i] * 1000);
        if (tempDate.getMonth() == date.getMonth() &&
            tempDate.getFullYear() == date.getFullYear()) {
            if (startIndex == 0) startIndex = i;
            endIndex = i;
        }
    }
    return [startIndex, endIndex];
}

function year() {
    var date = new Date();

    let startIndex = 0;
    let endIndex = 0;
    for (let i = 0; i < times.length; i++) {
        var tempDate = new Date(times[i] * 1000);
        if (tempDate.getFullYear() == date.getFullYear()) {
            if (startIndex == 0) startIndex = i;
            endIndex = i;
        }
    }
    return [startIndex, endIndex];
}