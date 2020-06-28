class GenerationGraph {
  constructor() {
    this.generations = [];
    this.container = document.getElementById("chart");
    this.container.width = 1000;
    this.container.height = 500;
    //this.containerx = this.container.getContext("2d");
    this.chart = new Chart(this.container, {
      type: 'line',
      data: {
        labels: [1],
        datasets: [{
          label: 'success rate of each generation',
          data: [0],
          fill: true,
          lineTension: 0,
          backgroundColor: [
            'rgba(98, 255, 138, 0.2)'
          ],
          borderColor: [
            'rgba(98, 255, 138, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        tooltips: {
          titleFontSize: 12,
          bodyFontSize: 12
        },
        scales: {
          scaleLabel: {
            fontSize: 24
          },
          yAxes: [{
            ticks: {
              beginAtZero: true,
              suggestedMax: 100
            }
          }]
        },
        legend: {
          labels: {
            // This more specific font property overrides the global property
            fontSize: 16
          }
        }
      }
    });
  }

  addGen(id, rate) {
    this.generations.push({id: id, rate: 100 - rate});
    this.update();
  }

  update() {
    let labels = [];
    let data = [];
    for(let i = 0; i < this.generations.length; i++) {
      labels[i] = this.generations[i].id;
      data[i] = this.generations[i].rate;
    }
    print(labels);
    print(data);
    this.chart.data.labels = labels;
    this.chart.data.datasets[0].data = data;
    this.chart.update();
  }
}
