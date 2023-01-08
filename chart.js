const COLORS = [
    [155, 0, 155, 0.7], // MAIN_COLOR - purple
    [155, 155, 0, 0.7], // yellow
    [0, 155, 155, 0.7], // cyan
    [200, 155, 0, 0.7], // orange
];

var peopleChart = null;
var derivativeChart = null;

/**
 * Calculates derivatives
 * @param {Array} values
 * @return {Array}
 */
function getDerivatives(values) {
    let mx = 0;
    let mn = 0;
    for (let i = 0; i < values.length - 1; i++) {
        values[i] = values[i + 1] - values[i];
        if (values[i] > mx) mx = values[i];
        if (values[i] < mn) mn = values[i];
    }
    values.pop();
    return [values, mn, mx];
}

/**
 * Create chart objects
 * @param {Array} values
 * @return {Array} of dataset objects
 */
function createDerivatives(values) {
    let ret = getDerivatives(values);
    let ders = ret[0];
    let colors = [];
    for (let i = 0; i < ders.length; i++) {
        let color = createColor(ders[i], ret[1], ret[2], [0, 255, 0, 1], [255, 0, 0, 1], [140, 140, 0, 1]);
        colors.push(createRgba(color));
    }
    let dataset = {
        linkTenstion: 0.2,
        backgroundColor: colors,
        data: values
    };
    return [dataset, ret[1], ret[2]];
}

/**
 * Draw the chart
 * @param {Array} labels - x axis
 * @param {Array} values... - y axis
 */
function drawChart(labels) {
    if (peopleChart != null) peopleChart.destroy();
    if (derivativeChart != null) derivativeChart.destroy();

    let datasets = [];
    let derivatives = [];
    let derivativesSecond = [];
    let mn, mn2 = -10;
    let mx, mx2 = 10;
    for (let i = 1; i < arguments.length; i++) {
        datasets.push({
            fill: true,
            linkTenstion: 0.2,
            backgroundColor: createRgba(COLORS[i-1], true),
            borderColor: createRgba(COLORS[i-1]),
            data: arguments[i]
        });
        ret = createDerivatives([...arguments[i]]);
        derivatives.push(ret[0]);
        if (ret[1] < mn) mn = ret[1];
        if (ret[2] > mx) mx = ret[2];

        ret = createDerivatives([...ret[0].data]);
        derivativesSecond.push(ret[0]);
        if (ret[1] < mn2) mn2 = ret[1];
        if (ret[2] > mx2) mx2 = ret[2];
    }

    peopleChart = new Chart("peopleCountChart", {
        type: "line",
        data: {
            labels: labels,
            datasets: datasets
        },
        options: {
            legend: {display: false},
            responsive: true,
            scales: {
                yAxes: [{ticks: {min: 0, max:1000}}],
            }
        }
    });

    derivativeChart = new Chart("derivativeChart", {
        type: "bar",
        data: {
            labels: labels,
            datasets: derivatives
        },
        options: {
            legend: {display: false},
            responsive: true,
            scales: {
                yAxes: [{ticks: {min: mn, max:mx}}],
            }
        }
    });

    derivativeChart = new Chart("derivativeSecondChart", {
        type: "bar",
        data: {
            labels: labels,
            datasets: derivativesSecond
        },
        options: {
            legend: {display: false},
            responsive: true,
            scales: {
                yAxes: [{ticks: {min: mn2, max:mx2}}],
            }
        }
    });

}

/**
 * Create rgba string
 * @param {Array} color
 * @param {boolean} descent - def FALSE
 * @return {String}
 */
function createRgba(color, descent=false) {
    let d = 1 - (descent*color[3]);
    return `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${d})`
}

/**
 * Create color by value
 * @param {Integer} value
 * @param {Integer} min
 * @param {Integer} max
 * @param {color} color1 - min color
 * @param {color} color2 - max color
 * @param {color} zeroColor
 * @return {string}
 */
function createColor(value, min, max, color1, color2, zeroColor) {
    let point = null;
    let color = null;
    if (value < 0) {
        point = min;
        color = color1;
    }
    else if (value > 0) {
        point = max;
        color = color2;
    }
    else return zeroColor;

    let ratio = value / point;
    let vector = [];
    for (let i = 0; i < color.length; i++) {
        vector.push(Math.floor(
                zeroColor[i] - (ratio * (zeroColor[i] - color[i]))
            )
        );
    }
    return vector;
}