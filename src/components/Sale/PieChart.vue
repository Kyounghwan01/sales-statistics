<script>
import { Pie, mixins } from 'vue-chartjs';
const { reactiveProp } = mixins;

export default {
  extends: Pie,
  mixins: [reactiveProp],
  props: ['options'],
  computed: {
    pieOption() {
      return {
        responsive: true,
        tooltips: {
          mode: 'point',
          bodyFontSize: 15,
          bodySpacing: 7,
          xPadding: 10,
          yPadding: 10,
          callbacks: {
            label(tooltipItem, { labels }) {
              return labels[tooltipItem.index];
            },
          },
        },
        legend: {
          display: false,
        },
      };
    },
  },
  mounted() {
    this.renderChart(this.chartData, this.pieOption);
  },
};
</script>
