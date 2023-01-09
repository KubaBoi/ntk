/**
 * Reformat list of times from getLists
 * @param {Array} times - list of times from getLists
 * @returns {Array} - formated times
 */
function reworkTimes(times) {
    for (let i = 0; i < times.length; i++) {
        times[i] = reworkTime(times[i]);
    }
    return times;
}


/**
 * Reformat time from getLists
 * @param {string} time - time from getLists
 * @returns {string} - formated time
 */
function reworkTime(time) {
    let v = time.split(".");
    return `${v[2]}.${v[3]}.${v[4]} ${v[1]}:${v[0]}`; 
}

/**
 * Add minute to 60 minute cycle
 * @param {integer} val 
 * @param {integer} hour - absolute value need to be <0, 60>
 *                          - else returned unchanged val
 * @returns {integer}
 */
function addMinute(val, minute=1) {
    if (Math.abs(minute) > 60) return val;
    val += minute;
    if (val >= 60) return val - 60;
    if (val < 0) return val + 60;
    return val;
}

/**
 * Add hour to 24 hour cycle
 * @param {integer} val 
 * @param {integer} hour - absolute value need to be <0, 24>
 *                          - else returned unchanged val
 * @returns {integer}
 */
function addHour(val, hour=1) {
    if (Math.abs(hour) > 24) return val;
    val += hour;
    if (val >= 24) return val - 24;
    if (val < 0) return val + 24;
    return val;
}

/**
 * Add day to 31 day cycle
 * @param {integer} val 
 * @param {integer} day - absolute value need to be <0, 31> 
 *                          - else returned unchanged val
 * @returns {integer}
 */
function addDay(val, day=1) {
    if (Math.abs(day) > 31) return val;
    val += day;
    if (val > 31) return val - 31;
    if (val <= 0) return val + 31;
    return val;
}

/**
 * Add month to 12 month cycle
 * @param {integer} val 
 * @param {integer} month - absolute value need to be <0, 12> 
 *                          - else returned unchanged val
 * @returns {integer}
 */
function addMonth(val, month=1) {
    if (Math.abs(month) > 12) return val;
    val += month;
    if (val > 12) return val - 12;
    if (val <= 0) return val + 12;
    return val;
}