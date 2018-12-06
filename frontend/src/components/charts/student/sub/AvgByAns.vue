<template>
  <section :class="{rtl: $i18n.locale==='he'}">
    <div class="quest-img slide-img" :style="bgImg"></div>
    <h2>{{questTxt}}</h2>
    <h2>
      <span :class="avgDisplay(avgForDisplay)">{{avgForDisplay}}</span>
    </h2>
  </section>
</template>

<script>
export default {
  props: {
    quest: Object,
    ans: Object,
    idx: Number
  },
  created() {
  },
  methods: {
    avgDisplay(avg) {
      avg = +avg;
      return [
        "avg-display",
        avg < 3 && avg > 0 ? "danger" : "",
        avg > 4 ? "success" : ""
      ];
    }
  },
  computed: {
    questTxt() {
      return this.$store.getters.isFemale ? this.quest.female : this.quest.male;
    },
    avgForDisplay() {
      return this.ans.avg.toFixed(2);
    },
    bgImg() {
      return (
        "background-image: url(" +
        require(`@/assets/img/quest/${this.idx % 11}.jpg`) +
        ")"
      );
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
