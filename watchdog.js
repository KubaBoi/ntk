var treshold = 100;

/**
 * Check if watchdog under treshold, otherwise show alert
 * @param {integer} watchdog 
 * @param {function} fun 
 * @returns {boolean}
 */
function watchdogCatch(watchdog, fun) {
    if (watchdog > treshold) {
        alert("Něco se pokazilo a watchdog přesáhl limitu ve funkci: " + fun.toString());
        return true;
    }
    return false;    
}