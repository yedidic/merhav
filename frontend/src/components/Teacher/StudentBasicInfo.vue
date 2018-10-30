<template>
<section>
  <div
    v-for="(submission, idx) in submissions"
    @click="expand(idx)"  
    :key="submission.at"
    :class="['flex' , idx > 0 ? 'student-expand-info': 'student-basic-info', isIncrease(idx)]"
    v-if="idx === 0 || isExpanded">
      <p class="expand-btn"><i class="fas fa-plus-circle" v-if="idx===0"></i></p>
      <p class="heb-name">{{idx === 0 ? hebName: ''}}</p>
      <p>{{getMonth(submission.at)}}</p>
      <p>{{getDate(submission.at)}}</p>
      <!-- How to watch the i18n here? -->
      <p>{{submissionAvg(submission)}}</p>
      <p class="change-precent flex"
         v-html="precentageForDisplay(submission, submissions[idx+1])">
      </p>
  </div>
</section>
</template>

<script>
export default {
  name: 'student-basic-info',
  props: {
    studentId: String,
    hebName: String,
    submissions: Array
  },
  data() {
    return {
      currIdx: 0,
      isExpanded: false
    };
  },
  methods: {
    isIncrease(idx) {
      // if (idx === 0) return '';
      let change = this.getChangePrecents(
        this.submissions[idx],
        this.submissions[idx + 1]
      );
      if (!change) return '';
      return change > 0 ? 'increase' : 'decrease';
    },
    submissionAvg({ answers }) {
      return (
        answers.reduce((acc, answer) => acc + answer) / answers.length
      ).toFixed(2);
    },
    expand(idx) {
      if (idx !== 0) return;
      this.isExpanded = !this.isExpanded;
    },
    getMonth(at) {
      // this.$watch
      return this.moment(at).format('MMMM');
    },
    getDate(at){
      return this.moment(at).format('DD/MM/YYYY')
    },
    getChangePrecents(sub1, sub2) {
      if (!sub2) return;
      return ((this.submissionAvg(sub1) - this.submissionAvg(sub2)) / 5) * 100;
    },
    precentageForDisplay(sub1, sub2) {
      if (!sub2) return;
      let totalChangePrecents = this.getChangePrecents(sub1, sub2);
      if (totalChangePrecents === 0) return '';
      return totalChangePrecents > 0
        ? `<span class="sign">+</span><span class="change-precent-display">${totalChangePrecents.toFixed(
            2
          )}%</span>`
        : `<span class="sign">-</span><span class="change-precent-display">${Math.abs(
            totalChangePrecents.toFixed(2)
          )}%</span>`;
    }
  },
  computed: {
    monthWord() {
      this.$i18n.locale;
      return this.moment(this.submissions[this.currIdx].at).format('MMMM');
    }
  },
  components: {}
};
</script>

<style lang="scss" scoped>
</style>
