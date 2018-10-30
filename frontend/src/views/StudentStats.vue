<i18n>
{
  "en":{
   "heading-female": "Hello {fullname}, welcome to your statistics page.",
   "heading-male": "Hello {fullname}, welcome to your statistics page."
  },
  "he":{
   "heading-male": "שלום {hebName}, ברוך הבא לדף הסטטיסטיקות שלך",
   "heading-female": "שלום {hebName}, ברוכה הבאה לדף הסטטיסטיקות שלך"   
  }
}
</i18n>

<template>
  <section class="student-stats">
    <h1>{{isFemale? $t('heading-female', {fullname, hebName}) : $t('heading-male', {fullname, hebName})}}</h1>
    <studentAggregateChart></studentAggregateChart>
  </section>
</template>

<script>
import StudentAggregateChart from '@/components/charts/StudentAggregateChart.vue';
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
    isFemale(){
      return this.$store.getters.loggedinUser.isFemale;
    }
  },
  components: {
    StudentAggregateChart
  }
};
</script>

<style lang="scss" scoped>
</style>



