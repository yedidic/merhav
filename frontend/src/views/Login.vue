<i18n>
{}
</i18n>

<template>
<section class="login">
    <h1>Login Page</h1>
    <form class="flex-col justify-center align-center" @submit.prevent="loginUser">

    <input type="text" placeholder="Enter your school code" v-model.number="userDetails.schoolCode">
    <input type="text" placeholder="Enter your ID" v-model.number="userDetails.userTz">
    <input type="password" placeholder="Enter Password" v-model="userDetails.psw">
    
    <button>Log In</button>
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
          else if (user && user.type === 't') {
            this.$router.push('/teacher');
          } else if (user && user.type === 'h') {
            this.$router.push('/teacher/headmaster');
          }
        });
    }
  }
};
</script>

<style lang="scss" scoped>
form * {
  width: 300px;
  margin-bottom: 1rem;
}
</style>


