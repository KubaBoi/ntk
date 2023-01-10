/**
 * Create two lists. First is list of all values and
 * second is list of all times
 *
 * conditions = [["years"], ["months"], ["days"], ["hours"], ["minutes"]]
 *
 * 
 * @param {object} obj 
 * @param {Array} conditions 
 * @param {integer} step 
 * @param {string} date 
 * @returns {Array} - two lists 
 *      [0] - values (y axis)
 *      [1] - labels (x axis)
 */
function getLists(obj, conditions=null, step=0, date="") {
    if (conditions == null) conditions = [[],[],[],[],[]];
    
    let values = [];
    let times = [];
    let keys = sortKeys(obj);
    for (let i = 0; i < keys.length; i++) {
        if (conditions[step].length > 0) {
            if (!conditions[step].includes(keys[i])) {
                continue;
            }
        }
        
        newDate = keys[i] + "." + date;
        let nextObj = obj[keys[i]];
        if (Array.isArray(nextObj)) {
            let newValues = [];
            let newTimes = [];
            for (let o = 0; o < nextObj.length; o++) {
                let minutes = (o * 10).toString();
                if (o == 0) minutes += "0";
                
                if (conditions[step+1].length > 0) {
                    if (!conditions[step+1].includes(minutes)) {
                        continue;
                    }
                }
                newValues.push(nextObj[o]);
                newTimes.push(minutes + "." + newDate);
            }
            values = values.concat(newValues);
            times = times.concat(newTimes);
        } 
        else {
            let vals = getLists(nextObj, conditions, step+1, newDate);
            values = values.concat(vals[0]);
            times = times.concat(vals[1]);
        }
    }
    return [values, times];
}

/**
 * Filter values
 * @param {object} obj
 * @returns {Array} - same as getLists()
 */
function filterLists(obj) {
    let strDate = "";
    let step = 0
    for (let i = 1; i < arguments.length; i++) {
        obj = obj[arguments[i]];
        strDate = arguments[i] + "." + strDate;
        step++;
    }
    return getLists(obj, null, step, strDate);
}
