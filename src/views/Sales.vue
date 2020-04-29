<template>
  <MainLayout :padded="false">
    <section class="sales" v-loading="salesStoreData.loading">
      <div class="sales__header">
        <h3>통계</h3>
        <el-select v-model="rangeType" placeholder="Select">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
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
      <BarChart v-loading="loading" :chart-data="handlSalesData('bar')" :options="chartOptions" />
      <PieChart :chart-data="handlSalesData('pieInput')" :options="pieOption" />
      <PieChart :chart-data="handlSalesData('pieOutput')" :options="pieOption" />

      <!-- <line-chart :chart-data="datacollection"></line-chart> -->
    </section>
  </MainLayout>
</template>

<script>
import MainLayout from '@/router/layouts/MainLayout';
import BarChart from '@/components/Sale/BarChart';
import PieChart from '@/components/Sale/PieChart';
// import LineChart from "@/components/Sale/LineChart";
import moment from 'moment';
import _ from 'lodash';

const colorSet = [
  'fa8787',
  'ffb7ce',
  'ffa4a8',
  'ffad87',
  'ffda62',
  'b5e384',
  '68e7c5',
  '81e0fa',
  '92c6ff',
  '8792c5',
  'c9aaf4',
  'f95454',
  'ff99b9',
  'ff7e83',
  'ff8a54',
  'ffcb1f',
  '96d750',
  '27dead',
  '4bd4f8',
  '64aeff',
  '5464ad',
  'b286f0',
  'c74343',
  'cc7a94',
  'cc6468',
  'cc6e43',
  'cca218',
  '78ac40',
  '1fb18a',
  '3ca9c6',
  '508bcc',
  '43508a',
  '8e6bc0',
  '953232',
  '995b6f',
  '994b4e',
  '995232',
  '997912',
  '5a8130',
  '178567',
  '2d7f94',
  '3c6899',
  '323c67',
  '6a5090',
  '632121',
  '663d4a',
  '663234',
  '663721',
  '66510c',
  '3c5620',
  '0f5845',
  '1e5463',
  '284566',
  '212845',
  '473560',
];

export default {
  components: {
    MainLayout,
    BarChart,
    PieChart,
    // LineChart
  },

  data() {
    return {
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
      rangeType: 'month',
      time: moment(new Date())
        .date(1)
        .format('YYYYMMDD'),
      data: {
        labels: ['20년 1월', '20년 2월', '20년 3월', '20년 4월'],
        datasets: [
          {
            label: '신규결제',
            type: 'bar',
            backgroundColor: '#FC8D59',
            data: [180000, 0, 300000, 0],
            yAxisID: 'amount',
            stack: 1,
          },
          {
            label: '재결제',
            type: 'bar',
            backgroundColor: '#91BFDB',
            data: [1367000, 580000, 0, 100000],
            yAxisID: 'amount',
            stack: 1,
          },
          {
            label: '업그레이드',
            type: 'bar',
            backgroundColor: '#D6EECC',
            data: [1600000, 0, 21700000, 6400000],
            yAxisID: 'amount',
            stack: 1,
          },
          {
            label: '환불',
            type: 'bar',
            backgroundColor: '#FDD8D8',
            data: [0, 0, 0, -7200000],
            yAxisID: 'amount',
            stack: 1,
          },
        ],
      },

      pieData: {
        labels: ['신규결제', '재결제', '업그레이드', '환불'],
        datasets: [
          {
            type: 'pie',
            data: [100000, 300000, 1800000, -3600000],
            countData: [0, 2, 1, 2],
            backgroundColor: ['#FC8D59', '#91BFDB', '#D6EECC', '#FDD8D8'],
          },
        ],
      },
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
  },

  watch: {
    rangeType: async function(value) {
      this.$store.dispatch('sales/getSalesDataWithChangeType', {
        searchType: value,
        date: this.time,
        id: this.loginUser.id,
      });
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

    handlSalesData(type) {
      const { searchRange, searchType, salesData } = this.salesStoreData;
      const labels = [];
      const flatArray = salesData.flat();

      searchRange[searchType].map(el => {
        const label = this.dateDisplay(el.start, searchType);
        labels.push(searchType === 'month' ? label.substr(2) : label.substr(6));
      });

      const barDataSets = [
        {
          label: '매출',
          type: 'bar',
          data: [],
          backgroundColor: '#FC8D59',
          yAxisID: 'amount',
          stack: 1,
        },
        {
          label: '매입',
          type: 'bar',
          data: [],
          backgroundColor: '#91BFDB',
          yAxisID: 'amount',
          stack: 1,
        },
        {
          label: '순이익',
          type: 'bar',
          data: [],
          backgroundColor: '#D6EECC',
          yAxisID: 'amount',
          stack: 2,
        },
      ];

      for (let i = 0; i < labels.length; i++) {
        for (let j = 0; j < barDataSets.length; j++) {
          barDataSets[j].data.push(0);
        }
      }

      //label: 매입/매출 물품
      //dataset: 매입/매출 나뉜 물품 나뉜 더한 값 + 더한 횟수 (물품 5건 1,000원)
      //상단: 총 매입/매출 건수 + 총 합산 가격 / 매입 건수 + 가격 / 매출 건수 + 가격 / 미수금 건수 + 가격
      //backgroundColor: 컬러셋 지정하고 순서에 맞게 값 넣기

      const pieData = {
        label: { input: [], output: [] },
        data: { input: [], output: [] },
        colorSet: { input: [], output: [] },
      };

      flatArray.map(({ type, goods }) =>
        type ? pieData.label.input.push({ goods }) : pieData.label.output.push({ goods }),
      );
      pieData.label.input = _.uniq(pieData.label.input.map(({ goods }) => goods));
      for (let i = 0; i < pieData.label.input.length; i++) {
        pieData.data.input.push(0);
        pieData.colorSet.input.push(`#${colorSet[i]}`);
      }

      pieData.label.output = _.uniq(pieData.label.output.map(({ goods }) => goods));
      for (let i = 0; i < pieData.label.output.length; i++) {
        pieData.data.output.push(0);
        pieData.colorSet.output.push(`#${colorSet[i]}`);
      }

      for (let i = 0; i < flatArray.length; i++) {
        if (flatArray[i].type) {
          pieData.data.input[pieData.label.input.indexOf(flatArray[i].goods)] += flatArray[i].price;
        } else {
          pieData.data.output[pieData.label.output.indexOf(flatArray[i].goods)] += flatArray[i].price;
        }
      }
      console.log(pieData);

      const inputPieChart = {
        labels: pieData.label.input,
        datasets: [
          {
            type: 'pie',
            data: pieData.data.input,
            backgroundColor: pieData.colorSet.input,
          },
        ],
      };

      const outputPieChart = {
        labels: pieData.label.output,
        datasets: [
          {
            type: 'pie',
            data: pieData.data.output,
            backgroundColor: pieData.colorSet.output,
          },
        ],
      };
      salesData.map((orderArray, index) => {
        orderArray.map(orders => {
          if (orders.type) {
            barDataSets[1].data[index] -= orders.price;
            barDataSets[2].data[index] -= orders.price;
          } else {
            barDataSets[0].data[index] += orders.price;
            barDataSets[2].data[index] += orders.price;
          }
        });
      });

      if (type === 'bar') {
        return { labels, datasets: barDataSets };
      } else if (type === 'pieInput') {
        return {
          labels: inputPieChart.labels,
          datasets: inputPieChart.datasets,
        };
      } else {
        return {
          labels: outputPieChart.labels,
          datasets: outputPieChart.datasets,
        };
      }
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
