<template>
  <MainLayout :padded="false">
    <section class="sales">
      <div class="sales__header">
        <h3>통계</h3>
        <el-select v-model="value" placeholder="Select">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>

        <el-date-picker
          v-model="value1"
          :type="value === 'week' ? 'week' : 'month'"
          range-separator="-"
          start-placeholder="시작일"
          end-placeholder="종료일"
          format="yyyy. M. d."
          value-format="yyyyMMdd"
          :clearable="false"
        >
        </el-date-picker>
      </div>
      <BarChart :chart-data="data" :options="chartOptions" />
      <PieChart :chart-data="pieData" :options="pieOption" />
    </section>
  </MainLayout>
</template>

<script>
import MainLayout from "@/router/layouts/MainLayout";
import BarChart from "@/components/Sale/BarChart";
import PieChart from "@/components/Sale/PieChart";
// import moment from "moment";

export default {
  components: {
    MainLayout,
    BarChart,
    PieChart
  },
  updated() {
    console.log(this.value1);
  },

  data() {
    return {
      options: [
        {
          value: "week",
          label: "주간"
        },
        {
          value: "month",
          label: "월간"
        }
      ],
      value: "month",
      value1: "",
      datacollection: null,
      data: {
        labels: ["20년 1월", "20년 2월", "20년 3월", "20년 4월"],
        datasets: [
          {
            label: "신규결제",
            type: "bar",
            backgroundColor: "#FC8D59",
            data: [180000, 0, 300000, 0],
            yAxisID: "amount",
            stack: 1
          },
          {
            label: "재결제",
            type: "bar",
            backgroundColor: "#91BFDB",
            data: [1367000, 580000, 0, 100000],
            yAxisID: "amount",
            stack: 1
          },
          {
            label: "업그레이드",
            type: "bar",
            backgroundColor: "#D6EECC",
            data: [1600000, 0, 21700000, 6400000],
            yAxisID: "amount",
            stack: 1
          },
          {
            label: "환불",
            type: "bar",
            backgroundColor: "#FDD8D8",
            data: [0, 0, 0, -7200000],
            yAxisID: "amount",
            stack: 1
          }
        ]
      },

      pieData: {
        labels: ["신규결제", "재결제", "업그레이드", "환불"],
        datasets: [
          {
            type: "pie",
            data: [0, 0, 1800000, -3600000],
            countData: [0, 2, 1, 2],
            backgroundColor: ["#FC8D59", "#91BFDB", "#D6EECC", "#FDD8D8"]
          }
        ]
      }
    };
  },
  computed: {
    chartOptions() {
      const { comma } = this.$filters;

      return {
        responsive: true,
        maintainAspectRatio: false,
        tooltips: {
          mode: "point",
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
              if (value != 0) {
                return datasets[datasetIndex].label;
              }
            }
          }
        },
        legend: {
          display: false
        },
        scales: {
          yAxes: [
            {
              id: "amount",
              position: "left",
              gridLines: {
                drawOnChartArea: false
              },
              ticks: {
                beginAtZero: true,
                callback: function(value) {
                  return `${comma(value)}원`;
                }
              },
              stacked: true
            }
          ],
          xAxes: [
            {
              stacked: true,
              barPercentage: 0.7,
              gridLines: {
                display: false
              }
            }
          ]
        }
      };
    },
    pieOption() {
      return {
        responsive: true,
        tooltips: {
          mode: "point",
          bodyFontSize: 15,
          bodySpacing: 7,
          xPadding: 10,
          yPadding: 10,
          callbacks: {}
        },
        legend: {
          display: false
        }
      };
    }
  },
  mounted() {
    this.fillData();
  },
  methods: {
    fillData() {
      this.datacollection = {
        labels: [this.getRandomInt(), this.getRandomInt()],
        datasets: [
          {
            label: "Data One",
            backgroundColor: "#f87979",
            data: [this.getRandomInt(), this.getRandomInt()]
          },
          {
            label: "Data One",
            backgroundColor: "#f87979",
            data: [this.getRandomInt(), this.getRandomInt()]
          }
        ]
      };
    },
    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
    }
  }
};
</script>
<style lang="scss" scoped>
.sales {
  padding: 10px 80px;
  &__header {
    display: flex;
    justify-content: space-between;
    h3 {
      font-size: 28px;
      font-weight: bold;
      letter-spacing: normal;
      margin: 15px;
    }
  }
}
/deep/ .el-icon-date {
  height: 0;
}
</style>
