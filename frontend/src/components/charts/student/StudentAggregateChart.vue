

<template>
  <section class="student-aggregate-chart">
    <canvas id="myChart" width="400" height="400" ref="chart"></canvas>
  </section>
</template>

<script>
import Chart from "chart.js";
export default {
  data() {
    return {
      chart: null
    };
  },
  methods: {
    renderCanvas() {
      this.chart = new Chart(this.$refs.chart, {
        type: "line",
        data: {
          labels: this.months,
          datasets: [
            {
              label: "ממוצע מד רגשי",
              data: this.avgs,
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
              ],
              borderColor: [
                "rgba(255,99,132,1)",
              ],
              borderWidth: 1
            }
          ]
        },
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true
                }
              }
            ]
          }
        }
      });
    }
  },
  watch: {
    ['$i18n.locale'](){
      this.renderCanvas();
    }
  },
  mounted() {
    this.renderCanvas();
  },
  computed: {
    submissions() {
      return this.$store.getters.loggedinUser.submissions
        .slice()
        .sort((a, b) => a.at - b.at);
    },
    months() {
      this.$i18n.locale; // To update the months on locale change
      return this.submissions.map(({ at }) => this.moment(at).format("DD/MM"));
    },
    avgs() {
      return this.submissions.map(({ avg }) => avg);
    }
  },
  created() {}
};
</script>

<style lang="scss" scoped>
</style>
