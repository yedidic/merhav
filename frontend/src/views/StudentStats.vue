<i18n>
{
  "en":{
   "heading-female": "Hello {fullname}, welcome to your statistics page.",
   "heading-male": "Hello {fullname}, welcome to your statistics page."
  },
  "he":{
   "heading-male": "ברוך הבא {hebName}, כאן אתה יכול לראות את ציר ההתפתחות האישי שלך",
   "heading-female":"ברוכה הבאה {hebName}, כאן את יכולה לראות את ציר ההתפתחות האישי שלך"
  }
}
</i18n>

<template>
  <section class="student-stats">
    <h1>{{isFemale? $t('heading-female', {fullname, hebName}) : $t('heading-male', {fullname, hebName})}}</h1>
    <!-- <router-link to="/student/stats/aggregate">Aggregate</router-link> |
    <router-link to="/student/stats/ans-avg" >Answer's Average</router-link> -->

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
    this.$router.push('/student/stats/aggregate');
  },
  components: {}
};
</script>

<style lang="scss" scoped>
</style>



