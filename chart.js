const COLORS = [
    [155, 0, 155, 0.7], // MAIN_COLOR - purple
    [155, 155, 0, 0.7], // yellow
    [0, 155, 155, 0.7], // cyan
    [200, 155, 0, 0.7] // orange
];


/**
 * Draw the chart
 * @param {Array} labels - x axis
 * @param {Array} values... - y axis
 */
function drawChart(labels) {
    let datasets = [];
    for (let i = 1; i < arguments.length; i++) {
        datasets.push({
            fill: true,
            linkTenstion: 0.2,
            backgroundColor: createRgba(COLORS[3], true),
            borderColor: createRgba(COLORS[3]),
            data: arguments[i]
        });
    }

    new Chart("myChart", {
        type: "line",
        data: {
            labels: labels,
            datasets: datasets
        },
        options: {
            legend: {display: false},
            responsive: false,
            scales: {
                yAxes: [{ticks: {min: 6, max:1000}}],
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