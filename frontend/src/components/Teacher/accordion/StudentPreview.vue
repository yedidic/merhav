<template>
  <section class="acc-student-preview">
    <div
      class="student-preview-line flex space-between align-center"
      @click="isExpanded=!isExpanded"
    >
      <i :class="['fas', isExpanded?'fa-times-circle': 'fa-plus-circle' ,'expand-btn']"></i>
      <div class="student-preview-name flex space-between align-center">
        <span>{{student.hebName}}</span>
      </div>
      <div class="student-preview-last flex space-between align-center">
        <span>הגשה אחרונה:</span>
        <span>{{lastSubDate}}</span>
        <span
          :class="[
            'avg-display',
            +formattedSubAvg<3 && +formattedSubAvg>0? 'danger':'',
            +formattedSubAvg>4? 'success': ''
        ]"
        >{{formattedSubAvg}}</span>
      </div>
    </div>
    <student-expand-table v-if="isExpanded && student.submissions.length" :student="student"></student-expand-table>
  </section>
</template>

<script>
import StudentExpandTable from "./StudentExpandTable.vue";
export default {
  props: {
    student: Object
  },
  data: () => ({
    isExpanded: false
  }),
  computed: {
    lastSubDate() {
      if (!this.student.submissions.length) return "לא הגיש עדיין";
      return this.moment(this.student.submissions[0].at).format("DD/MM/YY");
    },
    formattedSubAvg() {
      if (!this.student.submissions.length) return "0.0";
      return this.student.submissions[0].avg.toFixed(1);
    }
  },
  components: {
    StudentExpandTable
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/vars";

.student-preview-line {
  background: $clr7;
  color: $clr2;
  border: 1px solid $clr1;
  border-radius: 6px;
  margin: 0 auto 0.1rem;
  padding: 0.2rem 1rem;
  width: 100%;
  max-width: 500px;
  cursor: pointer;
}

.student-preview-name {
  flex: 1;
}
.student-preview-last {
  flex: 1.8;
  @media screen and (min-width: 400px) {
    flex: 1.3;
  }
}

.expand-btn {
  margin: 0 0 0 1rem;
}

// .last-sub-avg {
//   color: $clr1;
//   font-weight: 700;
//   justify-content: center;
//   border-radius: 8px;
//   width: 2rem;
//   background: lighten($clr5, 2%);
//   &.danger {
//     background: darkred;
//     color: white;
//   }
//   &.success {
//     background: darkgreen;
//     color: white;
//   }
// }
</style>
