<template>
  <section class="student-ans-avg">
    <h3>Student Answer's Average</h3>
  </section>
</template>

<script>
import Chart from 'chart.js';
export default {
  computed: {
    avgByAns() {
      const sums = this.$store.submissions.reduce((acc, submission) => {
        submission.answers.forEach((answer, idx) => {
          acc[idx] += answer;
        });
        return acc;
      }, []);

     const res =  sums.map((sum, idx) => {
        return {
          avg: sum / this.$store.submissions.length,
        };
      });
      return 18;
    },
    firstSub() {
      return this.$store.submissions[0];
    },
    answers() {
      return this.$store.submissions[0].answers;
    }
  }
};
</script>

<style>
</style>
