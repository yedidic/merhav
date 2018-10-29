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
    
    <div class="actions-container">
    <!-- <pre>
      {{students}}
    </pre> -->
    <section class="students-table">
      <header class="table-header flex">
        <p class="expand-btn"></p>
        <p>שם</p>
        <p>חודש</p>
        <p>ציון מצרפי אחרון</p>
        <p>שינוי חודשי</p>
      </header>
        <student-basic-info
          v-for="student in students"
          :hebName="student.hebName"
          :submissions="student.submissions"
          :studentId="student._id"
          :key="student._id"
        >
        </student-basic-info>
    </section>
      <!-- TODO: maybe emulate few secs to wait here -->
      <router-link to="/student/stats">
        <button class="btn stats-btn">{{$t('myOwnStatistics')}}</button>
      </router-link>
    </div>
  </section>
</template>

<script>
import UserService from '../services/UserService.js';

import GreetingUser from '@/components/GreetingUser.vue';
import StudentBasicInfo from '@/components/Teacher/StudentBasicInfo.vue';
import StudentExpandInfo from '@/components/Teacher/StudentExpandInfo.vue';
export default {
  data() {
    return {
      students: [],
      expands: {},
      openeds: []
    };
  },
  computed: {
    lastVisitDate() {
      let d = new Date(this.user.lastVisit);
      return d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();
    },
    user() {
      return this.$store.getters.loggedinUser;
    }
  },
  created() {
    this.loadStudents();
  },
  methods: {
    loadStudents() {
      UserService.getByClassCode(
        this.user.classCode,
        this.user.schoolCode
      ).then(students => (this.students = students));
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
    StudentBasicInfo,
    StudentExpandInfo,
    GreetingUser
  }
};
</script>

<style lang="scss" scoped>
.actions-container {
  display: flex;
  flex-flow: column;
  align-items: center;
}

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



