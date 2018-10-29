<template>
<div>
   <div 
      class="student-expand-info flex" 
      v-for="(submission, idx) in student.submissions"
      :key="submission.examId" v-if="idx > 0">
        <p></p>
        <p>{{getMonth(submission.at)}}</p>
        <p>{{submissionAvg(lastSubmission)}}</p>
        <p>{{precentageForDisplay}}</p>
  </div>
</div>
       
</template>

<script>
export default {
  name: 'student-expand-info',
  props: {
    student: Object
  },
  data(){
      return {
      }
  },
  methods: {
    submissionAvg({ answers }) {
      return answers.reduce((acc, answer) => acc + answer) / answers.length;
    },
    getMonth(timestamp){
      return this.mom 
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
    }
  },
  components: {}
};
</script>

<style lang="scss" scoped>
div{
  position: relative;
  width: 100%;
}
</style>
