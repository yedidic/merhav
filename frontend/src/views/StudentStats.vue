<template>
  <section class="student-stats">
    <h1>Hello Puki, welcome to your statistics page.</h1>
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
    
  },
  components:{
    StudentAggregateChart
  }
};
</script>

<style lang="scss" scoped>



</style>



