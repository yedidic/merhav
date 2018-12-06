<i18n>
{
  "en":{
    "lastSub": "Last Submissions"
  },
  "he":{
    "lastSub": "הגשות אחרונות"
  }
}
</i18n>

<template>
  <section class="student-submission-stats">
    <!-- <h2>{{$t('lastSub')}}</h2> -->
    <div class="submissions-container flex-centering flex-col">
      <button
        class="flex-centering"
        v-for="sub in submissions"
        :key="new Date(sub.at).getTime()"
        @click="openModal(sub)"
      >
        <span>{{moment(sub.at).format('DD/MM/YYYY')}}</span>
        <p class="flex-centering" :class="ansValBindingStyle(sub.avg)">{{sub.avg.toFixed(2)}}</p>
      </button>
    </div>
  </section>
</template>

<script>
import Bus, { OPEN_MODAL } from "@/services/EventBusService";
import QuestService from "@/services/QuestService";

export default {
  computed: {
    submissions() {
      return this.$store.getters.submissions;
    }
  },
  methods: {
    openModal(submission) {
      const ansIds = Object.keys(submission.ansMap);
      // TODO: Bus.$emit(OPEN_MODAL, {})
      QuestService.getByIds(ansIds).then(quests => {
        const qAndAns = quests.map(quest => ({
          ...quest,
          ans: submission.ansMap[quest._id]
        }));

        Bus.$emit(OPEN_MODAL, {
          at: submission.at,
          isFemale: this.$store.getters.isFemale ? "female" : "male",
          hebName: this.$store.getters.loggedinUser.hebName,
          qAndAns,
          fixedAvg: submission.avg.toFixed(2)
        });
        console.log(this.$root);
      });
    },
    getFormattedDate(at) {
      return this.moment(at).format("DD/MM/YYYY HH:MM");
    },
    ansValBindingStyle(ans) {
      return ["modal-q-ans", ans < 3 ? "danger" : "", ans > 4 ? "success" : ""];
    }
  }
};
</script>

<style scoped lang="scss">
.submissions-container {
  button {
    margin-bottom: 0.5rem;
  }
}
</style>
