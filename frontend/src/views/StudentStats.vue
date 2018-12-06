<i18n>
{
  "en":{
   "heading-female": "Hello {fullname}, welcome to your statistics page.",
   "heading-male": "Hello {fullname}, welcome to your statistics page.",
   "lastSubs": "Last submissions",
   "ansAvg":"Answer's average",
   "emotionalLine":"Emotional line"
  },
  "he":{
   "heading-male": "ברוך הבא {hebName}, זהו ציר ההתפתחות האישי שלך",
   "heading-female":"ברוכה הבאה {hebName}, זהו ציר ההתפתחות האישי שלך",
   "lastSubs": "הגשות אחרונות",
   "ansAvg":"ממוצע",
   "emotionalLine":"מד רגשי"
  }
}
</i18n>

<template>
  <section class="student-stats">
    <h1>{{isFemale? $t('heading-female', {fullname, hebName}) : $t('heading-male', {fullname, hebName})}}</h1>
    <div class="student-stats-links">
      <router-link class="bold" to="/student/stats/">{{$t('ansAvg')}}</router-link>
      <router-link class="bold" to="/student/stats/aggregate">{{$t('emotionalLine')}}</router-link>
      <router-link class="bold" to="/student/stats/submissions">{{$t('lastSubs')}}</router-link>
    </div>

    <router-view/>
  </section>
</template>

<script>
export default {
  data() {
    return {
      // lastVisit: 1538682569445
    };
  },
  computed: {
    hebName() {
      return this.$store.getters.loggedinUser.hebName;
    },
    fullname() {
      return this.$store.getters.loggedinUser.fullname;
    },
    isFemale() {
      return this.$store.getters.loggedinUser.isFemale;
    }
  },
  created() {},
  components: {}
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/vars";

.student-stats-links {
  margin: 0 0 0.5rem;
  font-size: 1.2rem;
  a {
    &:not(:first-child) {
      margin: 0 1.5rem 0 0;
    }
    transition: all 0.8s;
  }
  a:hover,
  a.router-link-exact-active {
    color: $clr4;
    font-size: 1.45rem;
  }
}
</style>



