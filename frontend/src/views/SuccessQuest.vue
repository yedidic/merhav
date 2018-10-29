<i18n>{
  "en":{
    "wellDone": "Well Done! Thank You!",
    "backToMyPage" : "Back to My Page"
  },
  "he":{
    "wellDone": "כל הכבוד! תודה רבה!",
    "backToMyPage" : "בחזרה לעמוד האישי"
  }
}
</i18n>

<template>
  <div class="success-quest">
    <h1>{{$t('wellDone')}}</h1>
    <router-link tag="button" to="/student">{{$t('backToMyPage')}}</router-link>
  </div>
</template>

<script>
export default {
  name: 'success-quest'
};
</script>

<style lang="scss" scoped>
</style>
