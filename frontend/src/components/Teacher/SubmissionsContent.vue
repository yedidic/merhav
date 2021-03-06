<template>
  <section class="submissions-content">
    <div
      v-for="(submission, idx) in submissions"
      @click="openModal(submission)"
      :key="submission.at"
      :class="['submission-row', 'flex' , idx > 0 ? 'student-expand-info': 'student-basic-info', isIncrease(idx)]"
      v-if="idx === 0 || isExpanded"
    >
      <p class="expand-btn" @click.stop="expand(idx)">
        <i class="fas fa-plus-circle" v-if="idx === 0"></i>
      </p>
      <p class="t-name heb-name">{{idx === 0 ? hebName: ''}}</p>
      <p class="t-month pc-only">{{getMonth(submission.at)}}</p>
      <p class="t-date">{{getDate(submission.at)}}</p>
      <!-- How to watch the i18n here? -->
      <p class="t-res" @click.stop="expandInfo(submission)">
        {{submissionAvg(submission)}}
      </p>
      <p
        class="t-change change-precent flex"
        v-html="precentageForDisplay(submission, submissions[idx+1])"
      ></p>
    </div>
  </section>
</template>

<script>
import QuestService from '@/services/QuestService';
import Bus, {OPEN_MODAL} from "@/services/EventBusService";
const objValsSumAndAvg = obj => {
  let sum = 0;
  for (const key in obj) {
    sum += obj[key];
  }
  return { sum, avg: sum / Object.keys(obj).length };
};
export default {
  name: "submissions-content",
  props: {
    studentId: String,
    hebName: String,
    submissions: Array,
    isFemale: Boolean
  },
  data() {
    return {
      currIdx: 0,
      isExpanded: false
    };
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
          isFemale: this.isFemale,
          qAndAns,
          hebName: this.hebName,
          fixedAvg: submission.avg.toFixed(2)
        });
      });
    },
    isIncrease(idx) {
      // if (idx === 0) return '';
      let change = this.getChangePrecents(
        this.submissions[idx],
        this.submissions[idx + 1]
      );
      if (!change) return "";
      return change > 0 ? "increase" : "decrease";
    },
    submissionAvg(submission) {
      if (submission.avg) return submission.avg.toFixed(2);
      return (
        submission.answers.reduce((acc, answer) => acc + answer) /
        submission.answers.length
      ).toFixed(2);
    },
    expand(idx) {
      if (idx !== 0) return;
      this.isExpanded = !this.isExpanded;
    },
    getMonth(at) {
      // this.$watch
      const month = this.moment(at).format("MMMM");
      return month.length > 4 ? month.substr(0, 3) + "'" : month;
    },
    getDate(at) {
      return this.moment(at).format("DD.MM.YY");
    },
    getChangePrecents(sub1, sub2) {
      if (!sub2) return;
      return ((this.submissionAvg(sub1) - this.submissionAvg(sub2)) / 5) * 100;
    },
    precentageForDisplay(sub1, sub2) {
      if (!sub2) return;
      let totalChangePrecents = this.getChangePrecents(sub1, sub2);
      if (totalChangePrecents === 0) return "";
      return totalChangePrecents > 0
        ? `<span class="sign">+</span><span class="change-precent-display">${totalChangePrecents.toFixed(
            2
          )}%</span>`
        : `<span class="sign">-</span><span class="change-precent-display">${(-totalChangePrecents).toFixed(
            2
          )}%</span>`;
    }
  },
  computed: {
    monthWord() {
      this.$i18n.locale;
      return this.moment(this.submissions[this.currIdx].at).format("MMMM");
    }
  },
  components: {}
};
</script>

<style lang="scss" scoped>
</style>
