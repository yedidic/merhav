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
    <h2>{{$t('lastSub')}}</h2>
    <!-- <pre>
            {{submissions}}
    </pre>-->
    <div class="submissions-container flex-col">
      <button 
        class="flex-col"
        v-for="sub in submissions" 
        :key="new Date(sub.at).getTime()" 
        @click="openModal(sub)">
        <span>{{moment(sub.at).format('DD/MM/YYYY')}}</span>
        <span class="hour">{{moment(sub.at).format('HH:MM')}}</span>
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
    }
  }
};
</script>

<style>
  .hour {
    
  }

</style>
