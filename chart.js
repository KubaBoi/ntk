
/**
 * Draw the chart
 * @param {Array} labels - x axis
 * @param {Array} values - y axis
 */
function drawChart(labels, values) {
    if (chart != null) chart.destroy();
    chart = new Chart("myChart", {
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                fill: true,
                lineTension: 0.2,
                backgroundColor: "rgba(155,0,155,0.3)",
                borderColor: "rgba(155,0,155,1)",
                data: values
            }]
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