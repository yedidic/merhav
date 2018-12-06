<i18n>
{
  "en":{
    "myOwnStatistics": "My Own Statistics"
  },
  "he":{
    "myOwnStatistics": "הסטטיסטיקות האישיות שלי"
  }
}
</i18n>

<template>
  <section class="teacher" v-if="user">
    <greeting-user
      :isFemale="user.isFemale"
      :fullname="user.fullname"
      :hebName="user.hebName"
      :lastVisit="user.lastVisit"
    ></greeting-user>

    <headmaster-section v-if="isHeadmaster" @chooseClass="chooseClass"/>

    <students-accordion v-if="students" :students="students"></students-accordion>
  </section>
</template>

<script>
import UserService from "../services/UserService.js";
import GreetingUser from "@/components/GreetingUser.vue";
import HeadmasterSection from "@/components/Teacher/HeadmasterSection.vue";
import StudentsAccordion from "@/components/Teacher/StudentsAccordion.vue";
import { GET_QUESTS } from "@/modules/QuestModule";

export default {
  data() {
    return {
      students: null,
      openeds: [],
      classCode: null
    };
  },
  computed: {
    lastVisitDate() {
      let d = new Date(this.user.lastVisit);
      return d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
    },
    user() {
      return this.$store.getters.loggedinUser;
    },
    isHeadmaster() {
      return this.user.type === "h";
    }
  },
  created() {
    if (!this.isHeadmaster) {
      this.loadStudents(this.user.classCode);
    }
    this.$store.dispatch({ type: GET_QUESTS });
  },
  methods: {
    chooseClass(classCode) {
      if (!this.isHeadmaster) return;
      this.loadStudents(classCode);
    },
    loadStudents(classCode) {
      UserService.getByClassCode(classCode, this.user.schoolCode).then(
        students => (this.students = students)
      );
    },
    getAvgForCurrMonth(exams) {
      exams = this.sortByAt(exams);
      let currMonthExam = exams[exams.length - 1].answers;
      return this.calcArrAvg(currMonthExam);
    },
    calcArrAvg(vals) {
      return vals.reduce((acc, val) => acc + val) / vals.length;
    },
    sortByAt(exams) {
      return exams.slice().sort((a, b) => a.at - b.at);
    },
    toggleOpened(id) {
      if (this.openeds.includes(id)) {
        this.openeds.splice(this.openeds.findIndex(opened => opened === id), 1);
      } else this.openeds.push(id);
    }
  },
  components: {
    StudentsAccordion,
    GreetingUser,
    HeadmasterSection
  }
};
</script>

<style lang="scss" scoped>
.actions-container button {
  width: 300px;
  height: 3rem;
  background: darkblue;
  color: lightcyan;
  cursor: pointer;
  margin-bottom: 25px;
  border: 1.5px lightcyan solid;
}
</style>



