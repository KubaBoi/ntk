
function formatUnix(unixTime) {
    var date = getDate(unixTime);

    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();

    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();

    var formattedDate = day + "." + month + "." + year;
    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

    return formattedDate + " " + formattedTime;
}

function getDate(unixTime) {
    return new Date((parseInt(unixTime) + (7*3600)) * 1000);
}