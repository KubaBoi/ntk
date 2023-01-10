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
 * Remove consecutive values of 0
 * @param {Array} values 
 * @param {Array} labels - better be copy
 * @return {Array} [values, labels]
 */
function hideZeroValues(values, labels) {
    if (!hideZeros) {
        return [values, labels];
    }

    let oldValue = 1;
    let newValues = [];
    let newLabels = [];
    for (let i = 0; i < values.length; i++) {
        if (values[i] == 0 && oldValue == 0) {
            continue;
        }
        newValues.push(values[i]);
        newLabels.push(labels[i]);
        oldValue = values[i];
    }
    return [newValues, newLabels];
}

/**
 * Changes value hideZeros and do the switch animation
 */
function changeZeroHide() {
    var switchButton = document.getElementById("switchButton");
    var switchBorder = document.getElementById("switchBorder");

    if (hideZeros) {
        hideZeros = false;
        doSwitchAnim(switchButton, switchBorder, "Off");
    }
    else {
        hideZeros = true;
        doSwitchAnim(switchButton, switchBorder);
    }
    change();
}

/**
 * Do the switch button animation
 * @param {Element} button 
 * @param {Element} border 
 * @param {String} val - "On" || "Off" 
 */
function doSwitchAnim(button, border, val="On") {
    button.style.animationName = `switchTo${val}`;
    button.style.animationDuration = "0.2s";
    button.style.animationFillMode = "forwards";

    border.style.animationName = `switchTo${val}Bc`;
    border.style.animationDuration = "0.2s";
    border.style.animationFillMode = "forwards";
}