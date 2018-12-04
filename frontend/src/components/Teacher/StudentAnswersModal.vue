<i18n>
{
  "en":{
    "title": "Submission Details",
    "avg": "Average"
  },
  "he":{
    "title": "פירוט שאלון",
    "avg": "ממוצע"
  }
}
</i18n>

<template>
  <section class="student-answers-modal">
    <h2>{{$t('title')}} - {{data.hebName}}</h2>
    <h3>{{formattedDate}}</h3>
    <ul class="clean-list">
      <li v-for="(currQ,idx) in data.qAndAns" :key="currQ._id">
        <ul class="clean-list flex space-between modal-q">
          <li>{{currQ[gen]}}</li>
          <li :class="[ 'modal-q-ans',
                        currQ.ans<3? 'danger':'',
                        currQ.ans>4? 'success': ''
           ]">{{currQ.ans}}</li>
        </ul>
        <div class="hr" v-if="idx<data.qAndAns.length-1"></div>
      </li>
    </ul>
    <h4>{{$t('avg')}}: {{data.fixedAvg}}</h4>
  </section>
</template>

<script>
export default {
  props: {
    data: Object
  },
  computed: {
    gen() {
      return this.data.isFemale ? "female" : "male";
    },
    formattedDate() {
      return this.moment(this.data.at).format("DD/MM/YYYY HH:MM");
    }
  }
};
</script>

<style lang="scss" scoped>


</style>

