<i18n>
{
  "en": {
    "goToQuest": "Go To Quest!",
    "myOwnStatistics": "My Own Statistics"
  },
  "he" :{
    "goToQuest": "מלא{female} את השאלון!",
    "myOwnStatistics": "הסטטיסטיקות האישיות שלי"
  }
}
</i18n>

<template>
  <section class="student" v-if="user">
    <greeting-user
    :isFemale="user.isFemale"
    :fullname="user.fullname"
    :hebName="user.hebName"
    :lastVisit="user.lastVisit"/>
    
    <div class="actions-container flex-col">
      <router-link to="/student/quest">
        <button class="btn quest-btn">{{$t('goToQuest', {female: user.isFemale? 'י': ''})}}</button>
      </router-link>
      <router-link to="/student/stats">
        <button class="btn stats-btn">{{$t('myOwnStatistics')}}</button>
      </router-link>
    </div>
  </section>
</template>

<script>
import UserService from '../services/UserService.js';
import GreetingUser from '@/components/GreetingUser.vue';

export default {
  data() {
    return {
      // locale: this.$i18n.locale
    };
  },
  computed: {
    lastVisitDate() {
      let d = new Date(this.user.lastVisit);
      return d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();
    },
    user() {
      let user = this.$store.getters.loggedinUser;
      if (!user) return this.$router.push('/');
      if (user.type === 's') return user;
      else if (user.type === 't') return this.$router.push('/teacher');
      else if (user.type === 'h')
        return this.$router.push('/teacher/headmaster');
    }
  },
  created() {},
  components: {
    GreetingUser
  }
};
</script>

<style lang="scss" scoped>
.actions-container button {
  width: 20rem;
  padding: 0.7rem 1rem;
  margin-bottom: 25px;
}
</style>





