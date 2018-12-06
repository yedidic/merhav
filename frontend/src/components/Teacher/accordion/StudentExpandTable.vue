<i18n>
{
    "he":{
        "date":"תאריך",
        "emoLine": "מד רגשי",
        "diff": "שינוי"
    },
    "en":{
        "date":"Date",
        "emoLine": "Emo-Line",
        "diff": "Diff"
    }
}
</i18n>

<template>
  <section class="student-expand-table">
    <table>
      <thead>
        <td>{{$t('date')}}</td>
        <td>{{$t('emoLine')}}</td>
        <td>{{$t('diff')}}</td>
      </thead>
      <tbody>
        <expand-table-line
          v-for="(sub,i) in student.submissions"
          @click.native="openModal(sub)"
          :key="sub.at"
          :sub="sub"
          :changePrecent="getChangePrecent(sub, student.submissions[i+1])"
        ></expand-table-line>
      </tbody>
    </table>
  </section>
</template>

<script>
import ExpandTableLine from "./ExpandTableLine.vue";
import Bus, { OPEN_MODAL } from "@/services/EventBusService";
import QuestService from "@/services/QuestService";

export default {
  props: {
    student: Object
  },
  methods: {
    getChangePrecent(sub1, sub2) {
      if (!sub2) return "";
      return ((sub1.avg - sub2.avg) / 5) * 100;
    },
    openModal(sub) {
      const ansIds = Object.keys(sub.ansMap);
      QuestService.getByIds(ansIds).then(quests => {
        const qAndAns = quests.map(quest => ({
          ...quest,
          ans: sub.ansMap[quest._id]
        }));
        Bus.$emit(OPEN_MODAL, {
          at: sub.at,
          isFemale: this.student.isFemale,
          qAndAns,
          hebName: this.student.hebName,
          fixedAvg: sub.avg.toFixed(2)
        });
      });
    }
  },
  components: {
    ExpandTableLine
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/vars";

.student-expand-table {
}
</style>

