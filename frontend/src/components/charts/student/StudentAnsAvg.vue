<template>
  <section class="student-ans-avg" v-if="quests">
    <carousel class="ltr" :autoplay="true" :perPage="1" v-if="quests">
      <slide v-for="(ans, ansId) in avgMap" :key="ansId" class="slide">
        <avg-by-ans :ans="ans" :quest="getQuest(ansId)"></avg-by-ans>
      </slide>
    </carousel>
  </section>
</template>

<script>
import QuestService from "@/services/QuestService";
import { Carousel, Slide } from "vue-carousel";
import avgByAns from "@/components/charts/student/sub/AvgByAns.vue";
export default {
  data() {
    return {
      quests: null
    };
  },
  components: {
    Carousel,
    Slide,
    avgByAns
  },
  created() {
    const ids = Object.keys(this.avgMap);
    QuestService.getByIds(ids).then(
      quests => (this.quests = quests)
    );
  },
  methods: {
    getQuest(id) {
      return this.quests.find(({ _id }) => _id === id);
    }
  },
  computed: {
    avgMap() {
      return this.$store.getters.submissions.reduce((acc, { ansMap }) => {
        for (var ansId in ansMap) {
          var ansVal = ansMap[ansId];
          if (!acc[ansId]) acc[ansId] = {};
          if (acc[ansId].count) acc[ansId].count++;
          else acc[ansId].count = 1;
          if (acc[ansId].sum) acc[ansId].sum += ansVal;
          else acc[ansId].sum = ansVal;
          acc[ansId].avg = acc[ansId].sum / acc[ansId].count;
        }
        return acc;
      }, {});
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
