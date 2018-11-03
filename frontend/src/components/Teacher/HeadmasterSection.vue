<i18n>
{
  "en":{
    "choose": "Choose",
    "chooseClass": "Please choose a class",
    "12": "12-",
    "11": "11-",
    "10": "10-",
    "09": "9-",
    "08": "8-",
    "07": "7-",
    "06": "6-",
    "05": "5-",
    "04": "4-",
    "03": "3-",
    "02": "2-",
    "01": "1-"
  },
  "he":{
    "choose": "בחר",
    "chooseClass": "בחר כיתה להצגה",
    "12": "י\"ב ",
    "11": "י\"א ",
    "10": "י' ",
    "09": "ט' ",
    "08": "ח' ",
    "07": "ז' ",
    "06": "ו' ",
    "05": "ה' ",
    "04": "ד' ",
    "03": "ג' ",
    "02": "ב' ",
    "01": "א' "
  }
}
</i18n>

<template>
<section class="headmaster-section">
  <form class="flex-col justify-center align-center" @submit.prevent="classChosen">
    <label>
      <span>
        {{$t('chooseClass')}}
      </span>  
      <!-- <input 
      type="text" 
      :placeholder="$t('chooseClass')" 
      v-model.number="classCode" /> -->
      <select  v-model.number="chosenCode">
        <!-- <option value="">--{{$t('chooseClass')}}--</option> -->
        <option 
        v-for="classCode in classCodes" 
        :key="classCode"
        :value="classCode">{{$t(`${classCode}`.substr(0,2)) + `${classCode}`.charAt(2)}}</option>
      </select>
    </label>
    <button>{{$t('choose')}}</button>
  </form>

</section>
</template>

<script>
export default {
  name: 'headmaster-section',
  props: {
    
  },
  data() {
    return {
      chosenCode: 0
    };
  },
  methods: {
   classChosen(){
     this.$emit('chooseClass', this.chosenCode);
   }
  },
  computed: {
    classCodes(){
      return this.$store.getters.loggedinUser.classCodes;
    }
  },
  components: {}
};
</script>

<style lang="scss" scoped>
label {
  span {
    margin-left: 1rem;
    font-size: 1.2rem;
  }
}

</style>
