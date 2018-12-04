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
   "heading-male": "ברוך הבא {hebName}, כאן אתה יכול לראות את ציר ההתפתחות האישי שלך",
   "heading-female":"ברוכה הבאה {hebName}, כאן את יכולה לראות את ציר ההתפתחות האישי שלך",
   "lastSubs": "הגשות אחרונות",
   "ansAvg":"ממוצע לתשובה",
   "emotionalLine":"מד רגשי"
  }
}
</i18n>

<template>
  <section class="student-stats">
    <h1>{{isFemale? $t('heading-female', {fullname, hebName}) : $t('heading-male', {fullname, hebName})}}</h1>
    <router-link to="/student/stats/">{{$t('ansAvg')}}</router-link> |
    <router-link to="/student/stats/aggregate">{{$t('emotionalLine')}}</router-link> |
    <router-link to="/student/stats/submissions">{{$t('lastSubs')}}</router-link>

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
  created() {
  },
  components: {}
};
</script>

<style lang="scss" scoped>
</style>



