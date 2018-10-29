<template>
  <section class="teacher" v-if="user">
    <h1>Hello {{user.fullname}}, welcome to our special app.</h1>
    <h3>
      You last visited MERHAV at {{lastVisitDate}}
    </h3>
    <div class="actions-container">
    <!-- <pre>
      {{students}}
    </pre> -->
    <table class="students-table">
      <thead>
        <th>שם</th>
        <th>חודש</th>
        <th>ציון מצרפי אחרון</th>
        <th>שינוי</th>
      </thead>
      <tbody >
        <template  v-for="student in students">
          
          <student-basic-info
          :student="student" 
          :key="student._id"
          @click.native="toggleOpened(student._id)"
          :class="{opened: openeds.includes(student._id)}">
          </student-basic-info>

          <student-expand-info
          v-if="openeds.includes(student._id)"
          :student="student"  
          :key="student.fullname">
          </student-expand-info>
        </template>
      </tbody>
    </table>
      <!-- TODO: maybe emulate few secs to wait here -->
      <router-link to="/student/stats">
        <button class="btn stats-btn">My Own Statistics</button>
      </router-link>
    </div>
  </section>
</template>

<script>
import UserService from '../services/UserService.js';

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
    StudentExpandInfo
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



