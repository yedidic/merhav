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

    <div class="actions-container flex-col align-center">
      <section class="students-table" v-if="students.length > 0">
        <header class="table-header submission-row flex">
          <p class="expand-btn"></p>
          <p class="t-name">שם</p>
          <p class="pc-only t-month">חודש</p>
          <p class="t-date">תאריך</p>
          <p class="t-res">מד רגשי</p>
          <p class="t-change">שינוי</p>
        </header>
        <submissions-content
          v-for="student in students"
          :hebName="student.hebName"
          :submissions="student.submissions"
          :studentId="student._id"
          :isFemale="student.isFemale"
          :key="student._id"
          @toggleModal="toggleModal"
        ></submissions-content>
      </section>
    </div>
    <modal v-if="modalData" :data="modalData" @toggleModal="toggleModal"/>
  </section>
</template>

<script>
import UserService from "../services/UserService.js";

import Modal from "@/components/Modal.vue";
import GreetingUser from "@/components/GreetingUser.vue";
import HeadmasterSection from "@/components/Teacher/HeadmasterSection.vue";
import SubmissionsContent from "@/components/Teacher/SubmissionsContent.vue";
import { GET_QUESTS } from "@/modules/QuestModule";

export default {
  data() {
    return {
      students: [],
      openeds: [],
      classCode: null,
      modalData: null
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
    toggleModal(modalData) {
      console.log(modalData);
      this.modalData = modalData;
    },
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
    Modal,
    SubmissionsContent,
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



