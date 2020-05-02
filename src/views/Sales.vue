<template>
  <MainLayout :padded="false">
    <section class="sales" v-loading="salesStoreData.loading">
      <div class="sales__header">
        <h3>통계</h3>

        <div class="sales__date-group">
          <el-select v-model="rangeType" placeholder="Select">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
          </el-select>

          <div class="sales__date-group__date-box">
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
      </div>

      <Summary v-loading="salesStoreData.loading" :barChartDataSet="barChartDataSet" />

      <div class="sales__chart-group">
        <el-card class="sales__chart-group__bar-chart" shadow="never">
          <div class="sales__chart-group__bar-chart__header">
            <h3>TREND</h3>
            <el-select v-model="chartType" placeholder="Select">
              <el-option v-for="item in chartTypeOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
          <BarChart
            v-if="chartType === 'bar'"
            v-loading="loading"
            :chart-data="barChartDataSet"
            :options="chartOptions"
          />
          {{ lineChartDataSet }}
          <line-chart :chart-data="datacollection" :options="lineoptions"></line-chart>
        </el-card>

        <div v-loading="loading" class="sales__chart-group__pie-chart-group">
          <DetailList
            :title="`${dateDisplay(rangeValue, rangeType)} 매출`"
            :data="handlSalesData('pieOutput')"
            :pieOption="pieOption"
          />

          <DetailList
            :title="`${dateDisplay(rangeValue, rangeType)} 매입`"
            :data="handlSalesData('pieInput')"
            :pieOption="pieOption"
          />
        </div>
      </div>
    </section>
  </MainLayout>
</template>

<script>
import MainLayout from '@/router/layouts/MainLayout';
import Summary from '@/components/Sale/Summary';
import BarChart from '@/components/Sale/BarChart';
import LineChart from '@/components/Sale/LineChart';
import DetailList from '@/components/Sale/DetailList';
import moment from 'moment';
import _ from 'lodash';
import constant from '@/constant';

export default {
  components: {
    MainLayout,
    Summary,
    BarChart,
    DetailList,
    LineChart,
  },

  data() {
    return {
      datacollection: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        datasets: [
          {
            label: '2018 Sales',
            borderColor: 'rgba(50, 115, 220, 0.5)',
            backgroundColor: 'rgba(50, 115, 220, 0.1)',
            data: [300, 700, 450, 750, 450],
          },
          {
            label: '2017 Sales',
            borderColor: 'rgba(255, 56, 96, 0.5)',
            backgroundColor: 'rgba(255, 56, 96, 0.1)',
            data: [600, 550, 750, 250, 700],
          },
        ],
      },
      // datacollection: {
      //   labels: [
      //     "January",
      //     "February",
      //     "March",
      //     "April",
      //     "May",
      //     "June",
      //     "July",
      //     "August",
      //     "September",
      //     "October",
      //     "November",
      //     "December"
      //   ],
      //   datasets: [
      //     {
      //       label: "Data",
      //       borderColor: "#80b6f4",
      //       pointBorderColor: "#80b6f4",
      //       pointBackgroundColor: "#80b6f4",
      //       pointHoverBackgroundColor: "#80b6f4",
      //       pointHoverBorderColor: "#80b6f4",
      //       pointBorderWidth: 10,
      //       pointHoverRadius: 10,
      //       pointHoverBorderWidth: 1,
      //       pointRadius: 3,
      //       fill: false,
      //       borderWidth: 4,
      //       data: [40, 20, 30, 50, 90, 10, 20, 40, 50, 70, 90, 100]
      //     }
      //   ]
      // },

      options: [
        {
          value: 'week',
          label: '주간',
        },
        {
          value: 'month',
          label: '월간',
        },
      ],
      chartTypeOptions: [
        {
          value: 'bar',
          label: '막대 그래프',
        },
        {
          value: 'line',
          label: '꺾은선 그래프',
        },
      ],
      chartType: 'bar',
      rangeType: 'month',
      time: moment(new Date())
        .date(1)
        .format('YYYYMMDD'),
    };
  },

  computed: {
    loginUser() {
      return this.$store.getters['loginUser/loginUser'];
    },

    salesStoreData() {
      return this.$store.getters['sales/sales'];
    },

    loading() {
      return this.$store.getters['sales/loading'];
    },

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
              if (value != 0) {
                return datasets[datasetIndex].label;
              }
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
    lineoptions() {
      return {
        ...this.chartOptions,
        scales: {
          xAxes: [
            {
              type: 'category',
              labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
            },
          ],
        },
      };
    },

    rangeValue: {
      get() {
        return this.time;
      },
      set(value) {
        if (this.rangeType === 'week') {
          this.time = moment(value)
            .subtract(1, 'day')
            .format('YYYYMMDD');
          this.$store.dispatch('sales/getSalesData', {
            date: this.time,
            id: this.loginUser.id,
          });
        } else {
          this.time = value;
          this.$store.dispatch('sales/getSalesData', {
            date: this.time,
            id: this.loginUser.id,
          });
        }
      },
    },

    barChartDataSet() {
      const { searchRange, searchType, salesData } = this.salesStoreData;
      const labels = [];

      searchRange[searchType].map(el => {
        const label = this.dateDisplay(el.start, searchType);
        labels.push(searchType === 'month' ? label.substr(2) : label.substr(6));
      });

      const barDataSets = [
        {
          label: '매출',
          type: 'bar',
          data: [],
          backgroundColor: constant.inComeColor,
          yAxisID: 'amount',
          stack: 1,
        },
        {
          label: '매입',
          type: 'bar',
          data: [],
          backgroundColor: constant.outComeColor,
          yAxisID: 'amount',
          stack: 1,
        },
        {
          label: '순이익',
          type: 'bar',
          data: [],
          backgroundColor: constant.profitColor,
          yAxisID: 'amount',
          stack: 2,
        },
      ];
      const count = { inCome: 0, outCome: 0 };

      for (let i = 0; i < labels.length; i++) {
        for (let j = 0; j < barDataSets.length; j++) {
          barDataSets[j].data.push(0);
        }
      }

      salesData.map((orderArray, index) => {
        orderArray.map(orders => {
          if (orders.type) {
            barDataSets[1].data[index] -= orders.price;
            barDataSets[2].data[index] -= orders.price;
            if (index === salesData.length - 1) {
              count.outCome++;
            }
          } else {
            barDataSets[0].data[index] += orders.price;
            barDataSets[2].data[index] += orders.price;
            if (index === salesData.length - 1) {
              count.inCome++;
            }
          }
        });
      });

      return {
        labels,
        datasets: barDataSets,
        total: [
          { label: '매출', price: barDataSets[0].data[barDataSets[0].data.length - 1], count: count.inCome },
          {
            label: '매입',
            price: barDataSets[1].data[barDataSets[1].data.length - 1],
            count: count.outCome,
          },
          {
            label: '순이익',
            price:
              barDataSets[0].data[barDataSets[0].data.length - 1] + barDataSets[1].data[barDataSets[1].data.length - 1],
            count: count.inCome + count.outCome,
          },
        ],
      };
    },

    lineChartDataSet() {
      // const data = {labels: this.barChartDataSet.labels, datasets: }
      return 'awd';
    },
  },

  watch: {
    rangeType: async function(value) {
      this.$store.dispatch('sales/getSalesDataWithChangeType', {
        searchType: value,
        date: this.time,
        id: this.loginUser.id,
      });
    },

    chartType: function(value) {
      console.log(value);
    },
  },

  async created() {
    await this.$store.dispatch('sales/getSalesData', {
      date: this.moment().format('YYYYMMDD'),
      id: this.loginUser.id,
    });
  },

  methods: {
    dateDisplay(value, type) {
      let text = this.moment(value).format('YYYY년 M월 D일 (ddd)');
      if (type === 'week') {
        const endOfWeek = this.moment(value).add(6, 'days');
        const year = endOfWeek.year();
        const month = endOfWeek.month() + 1;
        const week = Math.ceil(endOfWeek.date() / 7);
        text = `${year}년 ${month}월 ${week}주`;
      } else if (type === 'month') {
        text = this.moment(value).format('YYYY년 M월');
      }

      return text;
    },

    comma(value) {
      return this.$filters.comma(value);
    },

    handlSalesData(chartType) {
      const flatArray = this.salesStoreData.currentDateSalesData.flat();

      //label: 매입/매출 물품
      //dataset: 매입/매출 나뉜 물품 나뉜 더한 값 + 더한 횟수 (물품 5건 1,000원)
      //상단: 총 매입/매출 건수 + 총 합산 가격 / 매입 건수 + 가격 / 매출 건수 + 가격 / 미수금 건수 + 가격

      const pieData = {
        chart: {
          label: [],
          data: [],
          count: [],
          colorSet: [],
        },
        list: [],
      };

      /** 물품 이름 넣기 */
      flatArray.map(({ type, goods }) => {
        if ((chartType === 'pieInput' && type) || (chartType === 'pieOutput' && !type)) {
          pieData.chart.label.push({ goods });
        }
      });

      /** 물품 중복 제거 */
      pieData.chart.label = _.uniq(pieData.chart.label.map(({ goods }) => goods));

      /** pieChart data preset */
      for (let i = 0; i < pieData.chart.label.length; i++) {
        pieData.chart.data.push(0);
        pieData.chart.count.push(0);
        pieData.chart.colorSet.push(`#${constant.colorSet[i]}`);
      }

      /** pieChart data set */
      flatArray.map(({ type, goods, price }) => {
        if ((chartType === 'pieInput' && type) || (chartType === 'pieOutput' && !type)) {
          pieData.chart.data[pieData.chart.label.indexOf(goods)] += price;
          pieData.chart.count[pieData.chart.label.indexOf(goods)]++;
        }
      });

      /** pieChart list data set */
      for (let i = 0; i < pieData.chart.label.length; i++) {
        pieData.list.push({
          label: pieData.chart.label[i],
          price: pieData.chart.data[i],
          count: pieData.chart.count[i],
        });
      }

      return {
        labels: pieData.chart.label,
        datasets: [
          {
            type: 'pie',
            data: pieData.chart.data,
            backgroundColor: pieData.chart.colorSet,
          },
        ],
        count: pieData.chart.count,
        list: pieData.list,
      };
    },
  },
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
  &__date-group {
    display: flex;
    margin-top: 15px;
    &__date-box {
      display: flex;
      position: relative;
      margin-left: 30px;
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
  }

  &__chart-group {
    margin-top: 20px;
    &__bar-chart {
      &__header {
        display: flex;
        justify-content: space-between;
        h3 {
          margin: 0 0 30px 0;
        }
      }
    }
    &__pie-chart-group {
      margin-top: 20px;
      display: flex;
      justify-content: space-between;
    }
  }
}
/deep/ .el-icon-date {
  height: 0;
}
</style>
