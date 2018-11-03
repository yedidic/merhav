<i18n>
{
  "en":{
    "enterSchoolCode": "School code:",
    "exampleSchoolCode": "For Example: 269",
    "enterTz": "ID:",
    "exampleTz": "For Example: 214456934",
    "enterPassword": "Password:",
    "examplePassword": "For Example: a45B6",
    "heading": "Login to MERHAV",
    "login" : "Log In"
  },
  "he":{
    "enterSchoolCode": "קוד בית הספר:",
    "exampleSchoolCode": "לדוגמא: 269",
    "enterTz": "מספר ת.ז.:",
    "exampleTz": "לדוגמא : 214456934",
    "enterPassword": "סיסמא:",
    "examplePassword": "לדוגמא a45B6",
    "heading": "כניסה למרח\"ב",
    "login": "היכנס"
  }
}
</i18n>

<template>
<section class="login">
    <h1>{{$t('heading')}}</h1>
    <form class="flex-col justify-center align-center" @submit.prevent="loginUser">
    <label class="flex align-center">
      <span>
         {{$t('enterSchoolCode')}}  
      </span>
      <input type="number" :placeholder="$t('exampleSchoolCode')" v-model.number="userDetails.schoolCode">
    </label>
    <label class="flex align-center">
      <span>
        {{$t('enterTz')}}  
      </span>
      <input type="number" :placeholder="$t('exampleTz')" v-model.number="userDetails.userTz">
    </label>
    <label class="flex align-center">
      <span>
       {{$t('enterPassword')}}  
      </span>
      <input type="password" :placeholder="$t('examplePassword')" v-model="userDetails.psw">
    </label>
    
    <button>{{$t('login')}}</button>
    </form>

</section>    
</template>

<script>
import { LOGIN_USER } from '../modules/UserModule';
import { SET_EXAM } from '../modules/ExamModule';
export default {
  data() {
    return {
      userDetails: {
        userTz: '',
        psw: '',
        schoolCode: ''
      }
    };
  },
  created() {
    this.logoutExistUser();
  },
  methods: {
    logoutExistUser() {
      if (!this.$store.getters.loggedinUser) return;
      //TODO: session storage.
      this.$store.commit({ type: LOGIN_USER, user: null });
      this.$store.commit({ type: SET_EXAM, exam: null });
      localStorage.clear();
    },
    loginUser() {
      this.$store
        .dispatch(LOGIN_USER, { userDetails: this.userDetails })
        .then(user => {
          if (user && user.type === 's') this.$router.push('/student');
          else if (user) this.$router.push('/teacher');
        });
    }
  }
};
</script>

<style lang="scss" scoped>

</style>


