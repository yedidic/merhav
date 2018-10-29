<template>
<div>
  <div class="student-basic-info flex" 
    :key="submission.at"
    v-for="(submission, idx) in submissions">
      <p v-if="idx === 0">{{hebName}}</p>
      <p>{{getMonth(submissioמ)}}</p>
      <p>{{submissionAvg(lastSubmission)}}</p>
      <p>{{precentageForDisplay}}</p>
  </div>
</div>
</template>

<script>
export default {
  name: 'student-basic-info',
  props: {
    hebName: String,
    submissions: Array
  },
  data() {
    return {};
  },
  methods: {
    submissionAvg({ answers }) {
      return answers.reduce((acc, answer) => acc + answer) / answers.length;
    }
  },
  computed: {
    submissions() {
      return this.student.submissions.slice().sort((a, b) => a.at - b.at);
    },
    lastSubmission() {
      return this.submissions[0];
    },
    totalChangePrecents() {
      return (
        ((this.submissionAvg(this.lastSubmission) -
          this.submissionAvg(this.submissions[1])) /
          5) *
        100
      );
    },
    isIncrease() {
      return this.totalChangePrecents > 0;
    },
    precentageForDisplay() {
      return this.isIncrease
        ? `+${this.totalChangePrecents.toFixed(2)}%`
        : `${this.totalChangePrecents.toFixed(2)}%`;
    },
    getMonth() {
      this.$i18n.locale;
      return this.moment(this.submissions[0]).format('MMMM');
    }
  },
  components: {}
};
</script>

<style lang="scss" scoped>
</style>
