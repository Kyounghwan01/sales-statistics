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
          <BarChart v-if="chartType === 'bar'" v-loading="loading" :chart-data="barChartDataSet" />
          <line-chart v-else v-loading="loading" :chart-data="lineChartDataSet"></line-chart>
        </el-card>

        <div v-loading="loading" class="sales__chart-group__pie-chart-group">
          <DetailList
            :title="`${dateDisplay(rangeValue, rangeType)} 물품별 매출`"
            :data="handlSalesData('pieOutput')"
          />
          <DetailList :title="`${dateDisplay(rangeValue, rangeType)} 물품별 매입`" :data="handlSalesData('pieInput')" />
        </div>
        <div v-loading="loading" class="sales__chart-group__pie-chart-group">
          <DetailList
            :title="`${dateDisplay(rangeValue, rangeType)} 회사별 매출`"
            :data="handlSalesData('pieCompanyOutput')"
          />
          <DetailList
            :title="`${dateDisplay(rangeValue, rangeType)} 회사별 매입`"
            :data="handlSalesData('pieCompanyInput')"
          />
        </div>
      </div>
    </section>
  </MainLayout>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import MainLayout from '@/router/layouts/MainLayout.vue';
import Summary from '@/components/Sale/Summary.vue';
import BarChart from '@/components/Sale/BarChart.vue';
import LineChart from '@/components/Sale/LineChart.vue';
import DetailList from '@/components/Sale/DetailList.vue';
import moment from 'moment';
import _ from 'lodash';
import constant from '@/constant';

@Component({
  components: {
    MainLayout,
    Summary,
    BarChart,
    DetailList,
    LineChart,
  },
})
export default class Sales extends Vue {
  public options = [
    {
      value: 'week',
      label: '주간',
    },
    {
      value: 'month',
      label: '월간',
    },
  ];
  public chartTypeOptions = [
    {
      value: 'bar',
      label: '막대 그래프',
    },
    {
      value: 'line',
      label: '꺾은선 그래프',
    },
  ];

  public chartType = 'bar';
  public rangeType = 'month';
  public time = moment(new Date())
    .date(1)
    .format('YYYYMMDD');

  get loginUser() {
    return this.$store.getters['loginUser/loginUser'];
  }

  get salesStoreData() {
    return this.$store.getters['sales/sales'];
  }

  get loading() {
    return this.$store.getters['sales/loading'];
  }

  get rangeValue() {
    return this.time;
  }
  set rangeValue(value) {
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
  }

  get barChartDataSet() {
    const { searchRange, searchType, salesData } = this.salesStoreData;
    const labels = [];

    searchRange[searchType].map(el => {
      const label = this.dateDisplay(el.start, searchType);
      labels.push(searchType === 'month' ? label.substr(2) : label.substr(6));
    });

    const barDataSets: never = [
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
  }

  get lineChartDataSet() {
    const lineDataSets = this.barChartDataSet.datasets.map((el, index) => {
      return {
        ..._.omit(el, ['type', 'yAxisID', 'stack']),
        borderColor: constant.lineChartColorSet[index],
        backgroundColor: constant.lineChartColorSet[index],
        fill: false,
      };
    });

    return { labels: this.barChartDataSet.labels, datasets: lineDataSets };
  }

  @Watch('rangeType', { immediate: true })
  async changeRangeType(value: string): void {
    this.$store.dispatch('sales/getSalesDataWithChangeType', {
      searchType: value,
      date: this.time,
      id: this.loginUser.id,
    });
  }

  async created() {
    await this.$store.dispatch('sales/getSalesData', {
      date: this.moment().format('YYYYMMDD'),
      id: this.loginUser.id,
    });
  }

  dateDisplay(value: string, type: string): string {
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
  }

  comma(value: string): string {
    return this.$filters.comma(value);
  }

  handlSalesData(chartType: string) {
    const flatArray = this.salesStoreData.currentDateSalesData.flat();

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
    flatArray.map(({ type, goods, userName }) => {
      if ((chartType === 'pieInput' && type) || (chartType === 'pieOutput' && !type)) {
        pieData.chart.label.push({ goods });
      } else if ((chartType === 'pieCompanyInput' && type) || (chartType === 'pieCompanyOutput' && !type)) {
        pieData.chart.label.push({ userName });
      }
    });

    /** 물품 중복 제거 */
    pieData.chart.label = _.uniq(
      pieData.chart.label.map(({ goods, userName }) => {
        if (chartType === 'pieInput' || chartType === 'pieOutput') {
          return goods;
        } else {
          return userName;
        }
      }),
    );

    /** pieChart data preset */
    for (let i = 0; i < pieData.chart.label.length; i++) {
      pieData.chart.data.push(0);
      pieData.chart.count.push(0);
      pieData.chart.colorSet.push(`#${constant.colorSet[i]}`);
    }

    /** pieChart data set */
    flatArray.map(({ type, goods, userName, price }) => {
      if ((chartType === 'pieInput' && type) || (chartType === 'pieOutput' && !type)) {
        pieData.chart.data[pieData.chart.label.indexOf(goods)] += price;
        pieData.chart.count[pieData.chart.label.indexOf(goods)]++;
      } else if ((chartType === 'pieCompanyInput' && type) || (chartType === 'pieCompanyOutput' && !type)) {
        pieData.chart.data[pieData.chart.label.indexOf(userName)] += price;
        pieData.chart.count[pieData.chart.label.indexOf(userName)]++;
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

    /** 회사별 매출/매입 현황 */

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
  }
}

// export default {
//   components: {
//     MainLayout,
//     Summary,
//     BarChart,
//     DetailList,
//     LineChart,
//   },

// data() {
//   return {
//     options: [
//       {
//         value: 'week',
//         label: '주간',
//       },
//       {
//         value: 'month',
//         label: '월간',
//       },
//     ],
//     chartTypeOptions: [
//       {
//         value: 'bar',
//         label: '막대 그래프',
//       },
//       {
//         value: 'line',
//         label: '꺾은선 그래프',
//       },
//     ],
//     chartType: 'bar',
//     rangeType: 'month',
//     time: moment(new Date())
//       .date(1)
//       .format('YYYYMMDD'),
//   };
// },

// computed: {
//   loginUser() {
//     return this.$store.getters['loginUser/loginUser'];
//   },

//   salesStoreData() {
//     return this.$store.getters['sales/sales'];
//   },

//   loading() {
//     return this.$store.getters['sales/loading'];
//   },

//   rangeValue: {
//     get() {
//       return this.time;
//     },
//     set(value) {
//       if (this.rangeType === 'week') {
//         this.time = moment(value)
//           .subtract(1, 'day')
//           .format('YYYYMMDD');
//         this.$store.dispatch('sales/getSalesData', {
//           date: this.time,
//           id: this.loginUser.id,
//         });
//       } else {
//         this.time = value;
//         this.$store.dispatch('sales/getSalesData', {
//           date: this.time,
//           id: this.loginUser.id,
//         });
//       }
//     },
//   },

//   barChartDataSet() {
//     const { searchRange, searchType, salesData } = this.salesStoreData;
//     const labels = [];

//     searchRange[searchType].map(el => {
//       const label = this.dateDisplay(el.start, searchType);
//       labels.push(searchType === 'month' ? label.substr(2) : label.substr(6));
//     });

//     const barDataSets = [
//       {
//         label: '매출',
//         type: 'bar',
//         data: [],
//         backgroundColor: constant.inComeColor,
//         yAxisID: 'amount',
//         stack: 1,
//       },
//       {
//         label: '매입',
//         type: 'bar',
//         data: [],
//         backgroundColor: constant.outComeColor,
//         yAxisID: 'amount',
//         stack: 1,
//       },
//       {
//         label: '순이익',
//         type: 'bar',
//         data: [],
//         backgroundColor: constant.profitColor,
//         yAxisID: 'amount',
//         stack: 2,
//       },
//     ];
//     const count = { inCome: 0, outCome: 0 };

//     for (let i = 0; i < labels.length; i++) {
//       for (let j = 0; j < barDataSets.length; j++) {
//         barDataSets[j].data.push(0);
//       }
//     }

//     salesData.map((orderArray, index) => {
//       orderArray.map(orders => {
//         if (orders.type) {
//           barDataSets[1].data[index] -= orders.price;
//           barDataSets[2].data[index] -= orders.price;
//           if (index === salesData.length - 1) {
//             count.outCome++;
//           }
//         } else {
//           barDataSets[0].data[index] += orders.price;
//           barDataSets[2].data[index] += orders.price;
//           if (index === salesData.length - 1) {
//             count.inCome++;
//           }
//         }
//       });
//     });

//     return {
//       labels,
//       datasets: barDataSets,
//       total: [
//         { label: '매출', price: barDataSets[0].data[barDataSets[0].data.length - 1], count: count.inCome },
//         {
//           label: '매입',
//           price: barDataSets[1].data[barDataSets[1].data.length - 1],
//           count: count.outCome,
//         },
//         {
//           label: '순이익',
//           price:
//             barDataSets[0].data[barDataSets[0].data.length - 1] + barDataSets[1].data[barDataSets[1].data.length - 1],
//           count: count.inCome + count.outCome,
//         },
//       ],
//     };
//   },

//   lineChartDataSet() {
//     const lineDataSets = this.barChartDataSet.datasets.map((el, index) => {
//       return {
//         ..._.omit(el, ['type', 'yAxisID', 'stack']),
//         borderColor: constant.lineChartColorSet[index],
//         backgroundColor: constant.lineChartColorSet[index],
//         fill: false,
//       };
//     });

//     return { labels: this.barChartDataSet.labels, datasets: lineDataSets };
//   },
// },

//   watch: {
//     rangeType: async function(value) {
//       this.$store.dispatch('sales/getSalesDataWithChangeType', {
//         searchType: value,
//         date: this.time,
//         id: this.loginUser.id,
//       });
//     },
//   },

//   async created() {
//     await this.$store.dispatch('sales/getSalesData', {
//       date: this.moment().format('YYYYMMDD'),
//       id: this.loginUser.id,
//     });
//   },

//   methods: {
//     dateDisplay(value, type) {
//       let text = this.moment(value).format('YYYY년 M월 D일 (ddd)');
//       if (type === 'week') {
//         const endOfWeek = this.moment(value).add(6, 'days');
//         const year = endOfWeek.year();
//         const month = endOfWeek.month() + 1;
//         const week = Math.ceil(endOfWeek.date() / 7);
//         text = `${year}년 ${month}월 ${week}주`;
//       } else if (type === 'month') {
//         text = this.moment(value).format('YYYY년 M월');
//       }

//       return text;
//     },

//     comma(value) {
//       return this.$filters.comma(value);
//     },

//     handlSalesData(chartType) {
//       const flatArray = this.salesStoreData.currentDateSalesData.flat();

//       const pieData = {
//         chart: {
//           label: [],
//           data: [],
//           count: [],
//           colorSet: [],
//         },
//         list: [],
//       };

//       /** 물품 이름 넣기 */
//       flatArray.map(({ type, goods, userName }) => {
//         if ((chartType === 'pieInput' && type) || (chartType === 'pieOutput' && !type)) {
//           pieData.chart.label.push({ goods });
//         } else if ((chartType === 'pieCompanyInput' && type) || (chartType === 'pieCompanyOutput' && !type)) {
//           pieData.chart.label.push({ userName });
//         }
//       });

//       /** 물품 중복 제거 */
//       pieData.chart.label = _.uniq(
//         pieData.chart.label.map(({ goods, userName }) => {
//           if (chartType === 'pieInput' || chartType === 'pieOutput') {
//             return goods;
//           } else {
//             return userName;
//           }
//         }),
//       );

//       /** pieChart data preset */
//       for (let i = 0; i < pieData.chart.label.length; i++) {
//         pieData.chart.data.push(0);
//         pieData.chart.count.push(0);
//         pieData.chart.colorSet.push(`#${constant.colorSet[i]}`);
//       }

//       /** pieChart data set */
//       flatArray.map(({ type, goods, userName, price }) => {
//         if ((chartType === 'pieInput' && type) || (chartType === 'pieOutput' && !type)) {
//           pieData.chart.data[pieData.chart.label.indexOf(goods)] += price;
//           pieData.chart.count[pieData.chart.label.indexOf(goods)]++;
//         } else if ((chartType === 'pieCompanyInput' && type) || (chartType === 'pieCompanyOutput' && !type)) {
//           pieData.chart.data[pieData.chart.label.indexOf(userName)] += price;
//           pieData.chart.count[pieData.chart.label.indexOf(userName)]++;
//         }
//       });

//       /** pieChart list data set */
//       for (let i = 0; i < pieData.chart.label.length; i++) {
//         pieData.list.push({
//           label: pieData.chart.label[i],
//           price: pieData.chart.data[i],
//           count: pieData.chart.count[i],
//         });
//       }

//       /** 회사별 매출/매입 현황 */

//       return {
//         labels: pieData.chart.label,
//         datasets: [
//           {
//             type: 'pie',
//             data: pieData.chart.data,
//             backgroundColor: pieData.chart.colorSet,
//           },
//         ],
//         count: pieData.chart.count,
//         list: pieData.list,
//       };
//     },
//   },
// };
</script>

<style lang="scss" scoped>
.sales {
  padding: 10px 80px;
  overflow-y: auto;
  height: 85vh;
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
