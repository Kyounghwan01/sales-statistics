<script>
import { Bar, mixins } from 'vue-chartjs';
const { reactiveProp } = mixins;

export default {
  extends: Bar,
  mixins: [reactiveProp],
  props: ['options'],
  computed: {
    chartOptions() {
      const { comma } = this.$filters;

      return {
        responsive: true,
        maintainAspectRatio: false,
        tooltips: {
          mode: 'point',
          bodyFontSize: 15,
          bodySpacing: 7,
          xPadding: 10,
          yPadding: 10,
          callbacks: {
            title() {
              return null;
            },
            label(tooltipItem, { datasets }) {
              const { datasetIndex, value } = tooltipItem;
              return `${datasets[datasetIndex].label}: ${
                datasetIndex === 1 ? `${comma(-value)}원` : `${comma(value)}원`
              }`;
            },
          },
        },
        legend: {
          display: false,
        },
        scales: {
          yAxes: [
            {
              id: 'amount',
              position: 'left',
              gridLines: {
                drawOnChartArea: false,
              },
              ticks: {
                beginAtZero: true,
                callback: function(value) {
                  return `${comma(value)}원`;
                },
              },
              stacked: true,
            },
          ],
          xAxes: [
            {
              stacked: true,
              barPercentage: 0.7,
              gridLines: {
                display: false,
              },
            },
          ],
        },
      };
    },
  },
  mounted() {
    this.renderChart(this.chartData, this.chartOptions);
  },
};
</script>
