<template>
  <div>
    <v-card color="#FFFFFF" elevation="6">
      <div style="padding-bottom: 1rem">
        <div class="side_panel_title text--secondary">시세/실거래가</div>
        <v-divider></v-divider>
        <line-chart
          :chart-options="chartOptions"
          :chart-data="chartData"
          :chart-id="chartId"
          :dataset-id-key="datasetIdKey"
          :plugins="plugins"
          :css-classes="cssClasses"
          :styles="styles"
          :width="width"
          :height="height"
        ></line-chart>
        <v-divider id="section_divider"></v-divider>
        <v-simple-table fixed-header height="15rem">
          <template v-slot:default>
            <thead>
              <tr id="table_header">
                <th class="text-left table_header">계약일</th>
                <th class="text-left table_header">매매가</th>
                <th class="text-left table_header">전용면적</th>
                <th class="text-left table_header">층수</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in house.houseDealList" :key="index">
                <td class="table_body">
                  {{ item.dealYear }}.{{ item.dealMonth }}.{{ item.dealDay }}
                </td>
                <td class="table_body">{{ item.dealAmount }}만원</td>
                <td class="table_body">{{ item.area }}&#13217;</td>
                <td class="table_body">{{ item.floor }}층</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </div>
    </v-card>
  </div>
</template>

<script>
import { Line } from "vue-chartjs/legacy";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale,
} from "chart.js";
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale,
);
export default {
  components: { LineChart: Line },
  props: {
    house: Object,
    chartId: {
      type: String,
      default: "line-chart",
    },
    datasetIdKey: {
      type: String,
      default: "label",
    },
    width: {
      type: Number,
      // default: 400,
    },
    height: {
      type: Number,
      default: 160,
    },
    cssClasses: {
      default: "",
      type: String,
    },
    styles: {
      type: Object,
      default: () => {},
    },
    plugins: {
      type: Array,
      default: () => [{}],
    },
  },
  data() {
    return {
      chartOptions: {
        responsive: true,
      },
    };
  },
  computed: {
    chartData() {
      return {
        labels: this.house.avgPriceList.map(({ dealYear }) => {
          return `${dealYear}년`;
        }),
        datasets: [
          {
            data: this.house.avgPriceList.map(({ avgPrice }) => {
              return avgPrice / 10000;
            }),
            label: "매매가(억원)",
            borderColor: "rgb(75, 192, 192)",
            backgroundColor: "rgb(75, 192, 192)",
          },
        ],
      };
    },
  },
};
</script>

<style scoped>
.table_header {
  height: 1.5rem !important;
}
.table_body {
  font-size: 0.8rem !important;
}
#section_divider {
  border-width: 0.05rem !important;
}
</style>
