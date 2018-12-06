<template>
  <section v-if="quest" :class="['quest-preview', isUniq ? 'unique': '']">
    <h2 class="quest-txt">{{title}}</h2>
    <div class="quest-img" :style="bgImage"></div>
    <h2 v-if="isUniq" class="uniq-quest">שאלה אישית</h2>
    <h3>{{questTxt}}</h3>
    <div class="ans-container">
      <span>😢</span>
      <range-slider class="slider" min="1" max="5" step="1" v-model="answer" @change="ansUpdated"></range-slider>
      <span>😄</span>
    </div>
  </section>
</template>

<script>
import RangeSlider from "vue-range-slider";

export default {
  name: "QuestPreview",
  props: {
    quest: Object,
    idx: Number,
    isFemale: Boolean,
    isUniq: Boolean,
    title: String
  },
  data() {
    return {
      answer: 3
    };
  },
  created() {
    this.ansUpdated();
  },
  methods: {
    ansUpdated() {
      this.$emit("ansUpdated", this.answer, this.quest._id);
    }
  },
  computed: {
    questTxt() {
      return this.isFemale ? this.quest.female : this.quest.male;
    },
    bgImage() {
      return (
        "background-image: url(" +
        require(`@/assets/img/quest/${this.idx % 11}.jpg`) +
        ")"
      );
    }
  },
  components: {
    RangeSlider
  }
};
</script>

<style scoped lang="scss">
</style>
