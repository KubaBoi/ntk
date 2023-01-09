/**
 * Gets keys of object and sorts them 
 * ascended with bubble sort
 * @param {Object} obj
 * @return {Array} sorted keys
 */
function sortKeys(obj) {
    let keys = Object.keys(obj);
    let len = keys.length;
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len; j++) {
            if (keys[j] > keys[j + 1]) {
                let tmp = keys[j];
                keys[j] = keys[j + 1];
                keys[j + 1] = tmp;
            }
        }
    }
    return keys;
}

/**
 * Find last update 
 * @param {Object} obj
 * @param {String} date
 * @return {Array} [value, date->need reworkTime]
 */
function findLast(obj, date="") {
    let keys = sortKeys(obj);
    let lastKey = keys[keys.length-1];
    let nextObj = obj[lastKey];
    date = lastKey + "." + date;
    if (Array.isArray(nextObj)) {
        let index = nextObj.length - 1;
        let indexStr = index * 10;
        if (indexStr == 0) indexStr = "00";
        else indexStr = indexStr.toString();
        return [nextObj[index], indexStr + "." + date];
    }
    return findLast(nextObj, date);
}