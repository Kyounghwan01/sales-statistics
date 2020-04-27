<template>
  <MainLayout :padded="false">
    <section class="sales" v-loading="salesStoreData.loading">
      <div class="sales__header">
        <h3>통계</h3>
        <!-- {{ barChartData }} -->
        <el-select v-model="rangeType" placeholder="Select">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>

        <div class="date-box">
          <h3>{{ dateDisplay(rangeValue, rangeType) }}</h3>

          <el-date-picker
            v-model="rangeValue"
            :type="rangeType === 'week' ? 'week' : 'month'"
            range-separator="-"
            start-placeholder="시작일"
            end-placeholder="종료일"
            value-format="yyyyMMdd"
            :clearable="false"
          >
          </el-date-picker>
        </div>
      </div>
      <BarChart
        v-loading="salesStoreData.loading"
        :chart-data="barChartData"
        :options="chartOptions"
      />
      <PieChart :chart-data="pieData" :options="pieOption" />
    </section>
  </MainLayout>
</template>

<script>
import MainLayout from "@/router/layouts/MainLayout";
import BarChart from "@/components/Sale/BarChart";
import PieChart from "@/components/Sale/PieChart";
import moment from "moment";

export default {
  components: {
    MainLayout,
    BarChart,
    PieChart
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
      rangeType: "month",
      time: moment(new Date())
        .date(1)
        .format("YYYYMMDD"),
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
    loginUser() {
      return this.$store.getters["loginUser/loginUser"];
    },

    salesStoreData() {
      return this.$store.getters["sales/sales"];
    },

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
    },

    rangeValue: {
      get() {
        return this.time;
      },
      set(value) {
        if (this.rangeType === "week") {
          this.time = moment(value)
            .subtract(1, "day")
            .format("YYYYMMDD");
          this.$store.dispatch("sales/getSalesData", {
            date: this.time,
            id: this.loginUser.id
          });
        } else {
          this.time = value;
          this.$store.dispatch("sales/getSalesData", {
            date: this.time,
            id: this.loginUser.id
          });
        }
      }
    },

    barChartData() {
      const { searchRange, searchType, salesData } = this.salesStoreData;
      const labels = [];
      const datasets = [
        {
          label: "매출",
          type: "bar",
          data: [0, 0, 0, 0, 0],
          backgroundColor: "#FC8D59",
          yAxisID: "amount",
          stack: 1
        },
        {
          label: "매입",
          type: "bar",
          data: [0, 0, 0, 0, 0],
          backgroundColor: "#91BFDB",
          yAxisID: "amount",
          stack: 1
        },
        {
          label: "순이익",
          type: "bar",
          data: [0, 0, 0, 0, 0],
          backgroundColor: "#D6EECC",
          yAxisID: "amount",
          stack: 2
        }
      ];

      searchRange[searchType].map(el => {
        const label = this.dateDisplay(el.start, searchType);
        labels.push(searchType === "month" ? label.substr(2) : label.substr(6));
      });

      salesData.map((orderArray, index) => {
        orderArray.map(orders => {
          if (orders.type) {
            datasets[1].data[index] -= orders.price;
            datasets[2].data[index] -= orders.price;
          } else {
            datasets[0].data[index] += orders.price;
            datasets[2].data[index] += orders.price;
          }
        });
      });

      return {
        labels,
        datasets
      };
    }
  },

  watch: {
    rangeType: async function(value) {
      this.$store.dispatch("sales/getSalesDataWithChangeType", {
        searchType: value,
        date: this.time,
        id: this.loginUser.id
      });
    }
  },

  async created() {
    await this.$store.dispatch("sales/getSalesData", {
      date: this.moment().format("YYYYMMDD"),
      id: this.loginUser.id
    });
  },

  methods: {
    dateDisplay(value, type) {
      let text = this.moment(value).format("YYYY년 M월 D일 (ddd)");
      if (type === "week") {
        const endOfWeek = this.moment(value).add(6, "days");
        const year = endOfWeek.year();
        const month = endOfWeek.month() + 1;
        const week = Math.ceil(endOfWeek.date() / 7);
        text = `${year}년 ${month}월 ${week}주`;
      } else if (type === "month") {
        text = this.moment(value).format("YYYY년 M월");
      }

      return text;
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
.date-box {
  display: flex;
  position: relative;
  h3 {
    font-size: 18px;
    position: absolute;
    top: 30%;
    left: 0;
    right: 0;
    transform: translateY(-50%);
    text-align: center;
    z-index: 1;
    margin: 0;
    pointer-events: none;
  }
  /deep/ .el-input__inner {
    border: none;
    color: white;
    &:hover {
      cursor: pointer;
      border-bottom: 3px solid grey;
      border-radius: 0;
    }
  }
  /deep/ .el-input__prefix {
    display: none;
  }
}
</style>
