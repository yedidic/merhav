<i18n>
{
  "en":{
    "questTxt":"Question {questIdx} from {length}",
    "finish": "Finish!",
    "timeLeftLabel": "Time Left"
  },
  "he":{
    "questTxt":"שאלה {questIdx} מתוך {length}",
    "finish": "סיימתי!",
    "timeLeftLabel": "הזמן שנותר"
  }
}
</i18n>

<template>
  <section class="quest" v-if="exam">
    <p class="countdown">
      <span class="countdown-label">{{$t('timeLeftLabel')}}</span>
      <span class="countdown-clock">{{timeLeft}}</span>
    </p>
    <quest-preview
      v-for="idx in exam.questsIds.length+1"
      :key="idx"
      :title="$t('questTxt', {questIdx: idx, length: exam.questsIds.length+1})"
      :quest="getQuest(idx-1)"
      :idx="idx-1"
      :isUniq="idx-1 >= exam.questsIds.length"
      :isFemale="isFemale"
      @ansUpdated="ansUpdated"
    ></quest-preview>
    <button class="browse-btn btn" @click="submitQuest">{{$t('finish')}}</button>
  </section>
</template>

<script>
// TODO:
// optional: do it with routerLink. each quest gets an idx till you come to the end.
// in sec thought sounds better to just load all the quests here
//  and change the currIdx for each NextQuest click.
import { SET_EXAM } from "../modules/ExamModule";
import { UPDATE_USER, UNSHIFT_SUBMISSION } from "../modules/UserModule";
import QuestPreview from "@/components/QuestPreview.vue";

const objValsSumAndAvg = obj => {
  let sum = 0;
  for (const key in obj) {
    sum += obj[key];
  }
  return { sum, avg: sum / Object.keys(obj).length };
};
export default {
  data() {
    return {
      submission: { ansMap: {}, examId: "" },
      timeLeft: 30,
      timeLeftInterval: null,
      isSubmitted: false
    };
  },
  created() {
    if (!this.loggedinUser) this.$router.push("/");
    this.getExamFromServer(this.loggedinUser.schoolCode);
    this.decreaseTimeLeft();
  },
  watch: {
    isSubmitted(newVal) {
      if (newVal) clearInterval(this.timeLeftInterval);
      this.setAvg();
    }
  },
  methods: {
    getExamFromServer(schoolCode) {
      this.$store.dispatch({ type: SET_EXAM, schoolCode });
    },
    ansUpdated(answer, questId) {
      this.submission.ansMap[questId] = answer;
    },
    setAvg() {
      const { avg } = objValsSumAndAvg(this.submission.ansMap);
      this.submission.avg = avg;
    },
    submitQuest() {
      if (this.isSubmitted) return;
      this.isSubmitted = true;
      this.setAvg();
      this.submission.examId = this.exam._id;
      this.submission.at = new Date();
      console.log("submission", this.submission);
      this.$store
        .dispatch({
          type: UNSHIFT_SUBMISSION,
          submission: this.submission
        })
        .then(() => this.$router.push("/student/quest/success"));
    },
    getQuest(idx) {
      if (idx < this.exam.quests.length) {
        return this.exam.quests[idx];
      }
      return this.uniqQuest;
    },
    decreaseTimeLeft() {
      this.timeLeftInterval = setInterval(() => {
        --this.timeLeft;
        if (this.timeLeft <= 0) this.submitQuest();
      }, 1000);
    }
  },
  computed: {
    loggedinUser() {
      return this.$store.getters.loggedinUser;
    },
    exam() {
      return this.$store.getters.exam;
    },
    isFemale() {
      return this.loggedinUser.isFemale;
    },
    uniqQuest() {
      return this.$store.getters.uniqQuest;
    }
  },
  destroyed() {
    this.isSubmitted = true;
    clearInterval(this.timeLeftInterval);
  },
  components: {
    QuestPreview
  }
};
</script>

<style lang="scss" scoped>
</style>




