<template>
<section class="student-aggregate-chart">
  <canvas id="myChart" width="400" height="400" ref="chart"></canvas>
</section>
</template>

<script>
import Chart from 'chart.js';
const sum = arr => arr.reduce((acc, val) => acc + val);
export default {
  data() {
    return {
      chart: null
    };
  },
  methods: {
    renderCanvas() {
      this.chart = new Chart(this.$refs.chart, {
        type: 'line',
        data: {
          labels: this.months,
          datasets: [
            {
              label: 'ציון מצרפי',
              data: this.avgs,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
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
    '$i18n.locale'() {
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
      return this.submissions.map(({ at }) => this.moment(at).format('DD/MM'));
    },
    avgs() {
      return this.submissions.map(({answers}) => sum(answers) / answers.length);
    }
  },
  created() {    
  },
};
</script>

<style lang="scss" scoped>

</style>
