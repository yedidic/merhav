<template>
  <section :class="{rtl: $i18n.locale==='he'}">
      <div class="quest-img slide-img" :style="bgImg"></div>
    <h2>{{questTxt}}</h2>
    <h2>{{avgForDisplay}}</h2>
  </section>
</template>

<script>
export default {
  props: {
    quest: Object,
    ans: Object
  },
  created() {},
  computed: {
    questTxt() {
      return this.$store.getters.isFemale ? this.quest.female : this.quest.male;
    },
    avgForDisplay() {
      return this.ans.avg.toFixed(2);
    },
    bgImg() {
        console.log(this.quest)
      return {
          background: `url(${this.quest.img}) no-repeat center center`
      };
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
