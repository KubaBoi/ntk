/*Reformat list of times from getLists*/
function reworkTimes(times) {
    for (let i = 0; i < times.length; i++) {
        times[i] = reworkTime(times[i]);
    }
    return times;
}

/*Reformat time from getLists*/
function reworkTime(time) {
    let v = time.split(".");
    return `${v[2]}.${v[3]}.${v[4]} ${v[1]}:${v[0]}`;
}