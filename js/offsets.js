const COLORS = [
    [155, 0, 155, 0.7], // MAIN_COLOR - purple
    [200, 155, 0, 0.7], // orange
    [0, 155, 0, 0.7], //green
    [0, 155, 155, 0.7], // cyan
    [155, 0, 0, 0.7], // red
    [155, 155, 0, 0.7], // yellow
    [0, 0, 155, 0.7], // blue
];

var switchOffSetTemplate = `
<div id="switchDiv$id$" class="switchDiv" onclick="changeOffSetActivity($id$)">
    <div id="switchBorder$id$" class="switchBorder">
        <div id="switchButton$id$" class="switchButton"></div>
    </div>
</div>`;

var selectOffSetTemplate = `
<select id="selectOffSet$id$" onchange="offSetChange($id$)">
    <option value=3>Hodin</option>
    <option value=2>Dní</option>
    <option value=1>Měsíců</option>
    <option value=0>Let</option>
</select>`;

/**
 * Add new offSet with default values
 * and redraw offSets table
 */
function addOffSet() {
    if (offSets.length + 1 >= COLORS.length) {
        alert("Není možné zobrazit více grafů.");
        return;
    }
    offSets.push(
        {
            value: 1,
            metric: 2,
            active: true
        }
    );
    drawOffSets();
}

/**
 * Draw offSets table
 */
function drawOffSets() {
    let table = document.getElementById("offSetDiv");
    clearTable(table);

    for (let i = 0; i < offSets.length; i++) {
        let ofs = offSets[i];

        let colorButton = createElement("button", null, "", [
            {"name": "style", "value": `background-color:${createRgba(COLORS[i+1])};`},
            {"name": "class", "value": "colorButton"}
        ]);

        let valueInp = createElement("input", null, "", [
            {"name": "value", "value": ofs.value},
            {"name": "type", "value": "number"},
            {"name": "min", "value": 1},
            {"name": "max", "value": 32},
            {"name": "id", "value": `valueInp${i}`},
            {"name": "onchange", "value": `offSetChange(${i})`}
        ]);

        let removeOffSetButton = createElement("button", null, "Odebrat", [
            {"name": "onclick", "value": `removeOffSet(${i})`}
        ]);

        addRow(table, [
            {"text": colorButton.outerHTML},
            {"text": valueInp.outerHTML},
            {"text": selectOffSetTemplate.replaceAll("$id$", i)},
            {"text": switchOffSetTemplate.replaceAll("$id$", i)},
            {"text": removeOffSetButton.outerHTML}
        ]);

        let select = document.getElementById(`selectOffSet${i}`);
        select.value = ofs.metric;

        if (ofs.active) {
            let button = document.getElementById(`switchButton${i}`);
            let border = document.getElementById(`switchBorder${i}`);
            doSwitchAnim(button, border);
        }
    }
}

/**
 * Change activity of offSet by id as index
 * @param {Integer} id 
 */
function changeOffSetActivity(id) {
    let button = document.getElementById(`switchButton${id}`);
    let border = document.getElementById(`switchBorder${id}`);
    if (offSets[id].active) {
        offSets[id].active = false;
        doSwitchAnim(button, border, "Off");
    }
    else {
        offSets[id].active = true;
        doSwitchAnim(button, border);
    }
}

/**
 * Change all offSets
 */
function offSetChangeAll() {
    for (let i = 0; i < offSets.length; i++) {
        offSetChange(i);
    }
}

/**
 * Called onchage of select and value input
 * @param {Integer} id 
 */
function offSetChange(id) {
    let ofs = offSets[id];
    ofs.value = document.getElementById(`valueInp${id}`).value;
    ofs.metric = document.getElementById(`selectOffSet${id}`).value;
}

/**
 * Remove offSet from offSets array by id as index
 * And redraw offSets table
 * @param {Integer} id 
 */
function removeOffSet(id) {
    offSets.splice(id, 1);
    drawOffSets();
}