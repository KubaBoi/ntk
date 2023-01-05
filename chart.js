
function drawChart(labels, values) {
    new Chart("myChart", {
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
            responsive: true,
            scales: {
                yAxes: [{ticks: {min: 6, max:1000}}],
            }
        }
        });
}