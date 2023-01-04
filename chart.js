
function drawChart(labels, values) {
    new Chart("myChart", {
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                fill: true,
                lineTension: 0.2,
                backgroundColor: "rgba(0,0,255,0.1)",
                borderColor: "rgba(0,0,255,1)",
                data: values
            }]
        },
        options: {
            legend: {display: false},
            scales: {
                yAxes: [{ticks: {min: 6, max:1000}}],
            }
        }
        });
}