/*
Create two lists. First is list of all values and
second is list of all times

conditions = [["years"], ["months"], ["days"], ["hours"], ["minutes"]]
*/
function getLists(obj, step=0, date="", conditions=[[],[],[],[],[]]) {
    let values = [];
    let times = [];
    let keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
        if (conditions[step].length > 0) {
            if (!conditions[step].includes(keys[i])) {
                continue;
            }
        }
        
        newDate = keys[i] + "." + date;
        let nextObj = obj[keys[i]];
        if (Array.isArray(nextObj)) {
            newValues = [];
            newTimes = [];
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
            let vals = getLists(nextObj, step+1, newDate, conditions);
            values = values.concat(vals[0]);
            times = times.concat(vals[1]);
        }
    }
    return [values, times];
}

/*Filter values*/
function filterLists(obj) {
    let strDate = "";
    let step = 0
    for (let i = 1; i < arguments.length; i++) {
        obj = obj[arguments[i]];
        strDate = arguments[i] + "." + strDate;
        step++;
    }
    return getLists(obj, step, strDate);
}