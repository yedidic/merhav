<template>
  <section v-if="quest"
  :class="['quest-preview', isUniq? 'unique': '']" >
      <div class="quest-img" :style="'background-image: url('+quest.img+')'"></div>
      <h2 v-if="isUniq">שאלה אישית</h2>
      <h3 >
        {{questTxt}}
      </h3>
      <div class="ans-container">
        <span>😢</span>
        <range-slider
          class="slider"
          min="1"
          max="5"
          step="1"
          v-model="answer"
          @change="ansUpdated"></range-slider>
        <span>😄</span>
      </div>
  </section>
</template>

<script>
import RangeSlider from 'vue-range-slider';

export default {
  name: 'QuestPreview',
  props: {
    quest: Object,
    idx: Number,
    isFemale: Boolean,
    isUniq: Boolean
  },
  data() {
    return {
      answer: 3
    };
  },
  methods: {
    ansUpdated() {
      this.$emit('ansUpdated', this.answer, this.idx);
    }
  },
  computed: {
    questTxt() {
      return this.isFemale ? this.quest.female : this.quest.male;
    }
  },
  components: {
    RangeSlider
  }
};
</script>

<style scoped lang="scss">
.quest-img {
  height: 45vh;
  max-width: 100vw;
  background-position: center center;
  margin-bottom: 2rem;
  background-repeat: no-repeat;
}

.ans-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 3rem;
  span {
    font-size: 2rem;
  }

  .slider {
    width: 75vw;
    max-width: 300px;
    height: 2rem;
  }
}
h3 {
  direction: rtl;
}
h3.unique {
  color: darkgreen;
}
</style>
