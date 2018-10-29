<i18n>
{
  "en": {
    "hello-female": "Hello {fullname}, welcome to our special app.",
    "hello-male": "Hello {fullname}, welcome to our special app.",
    "lastVisitApp": "You last visited MERHAV at {lastVisitDate}"  
  },  
  "he" :{
    "hello-female": "שלום {hebName}, ברוכה הבאה לאפליקציית מרח\"ב!",
    "hello-male": "שלום {hebName}, ברוך הבא לאפליקציית מרח\"ב!",
     "lastVisitApp": "ביקרת לאחרונה באפליקציה בתאריך {lastVisitDate} "
  }
}
</i18n>

<template>
  <section class="greeting-user">
    <h1>{{greet}}</h1>
    <h3>
      {{$t('lastVisitApp', {lastVisitDate})}}
    </h3>
  </section>
</template>

<script>
export default {
  name: 'GreetingUser',
  props: {
    isFemale: Boolean,
    fullname: String,
    hebName: String,
    lastVisit: [Number, Object, Date]
  },
  created() {
    this.$i18n.locale;
  },
  computed: {
    lastVisitDate() {
      let d = new Date(this.lastVisit);
      return d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();
    },
    greet() {
      this.$i18n.locale;
      const gender = this.isFemale ? 'female' : 'male';
      return this.$t('hello-' + gender, {
        fullName: this.fullname,
        hebName: this.hebName
      });
    }
  }
};
</script>

<style scoped lang="scss">
</style>
