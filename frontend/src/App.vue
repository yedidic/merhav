<template>
  <div id="app" :class="{rtl: locale==='he'}">
      <nav-bar
      :user="user"
      :myPage="getMyPageByUserType"
      :loginMode="login"
      ></nav-bar>
      
      <router-view/>
  </div>
</template>


<script>
import { RELOGIN_USER } from './modules/UserModule';
import NavBar from './components/NavBar.vue';
export default {
  data() {
    return {
      locale: 'he'
    };
  },
  created() {
    this.$i18n.locale = 'he';
    this.moment.locale('he');
    this.reloginUserFromLocalStorage();
  },
  methods: {
    reloginUserFromLocalStorage() {
      console.log('%c TODO: relogin the user here', 'color:lightskyblue;');
      this.$store.dispatch({ type: RELOGIN_USER });
    }
  },
  watch: {
    locale(val) {
      this.$i18n.locale = val;
      this.moment.locale(val);
    }
  },
  computed: {
    user() {
      return this.$store.getters.loggedinUser;
    },
    getMyPageByUserType() {
      if (!this.user) return '';
      if (this.user.type === 's') return '/student';
      if (this.user.type === 't') return '/teacher';
      if (this.user.type === 'h') return '/teacher/headmaster';
    },
    login() {
      if (this.user) return 'logout';
      return 'login';
    }
  },
  components: {
    NavBar
  }
};
//elad
</script>

<style lang="scss">
.rtl {
  direction: rtl;
}
#app {
  //   font-family: 'Avenir', Helvetica, Arial, sans-serif;
  //   -webkit-font-smoothing: antialiased;
  //   -moz-osx-font-smoothing: grayscale;
  padding-top: 4rem;
  text-align: center;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
