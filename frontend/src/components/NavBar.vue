<i18n>
{
  "en":{
    "home": "Home",
    "about": "About",
    "login": "Login",
    "logout": "Logout",
    "myPage": "myPage"
  },
  "he":{
    "home": "דף הבית",
    "about": "עלינו",
    "login": "התחבר",
    "logout": "התנתק",
    "myPage": "עמוד אישי"
  }
}
</i18n>

<template>
  <nav class="nav-bar">
    <div class="container flex space-between">
      <div class="locale-menu" hidden>
        <label for="locale">שפה</label>
        <select v-model="locale">
          <option>he</option>
          <option>en</option>
        </select>
      </div>
      <router-link :to="user? myPage: '/'" >
        <logo-container/>
      </router-link>
        <views-menu
          :user="user"
          :myPage="myPage"
          :loginMode="loginMode"/>
    </div>
  </nav>
</template>

<script>
import LogoContainer from '@/components/LogoContainer.vue';
import ViewsMenu from '@/components/ViewsMenu.vue';

export default {
  name: 'NavBar',
  props: {
    user: Object,
    myPage: String,
    loginMode: String
  },
  data() {
    return {
      locale: 'he'
    };
  },
  watch: {
    locale(val) {
      this.$parent.locale = val;
    }
  },
  methods: {},
  computed: {},
  components: {
    LogoContainer,
    ViewsMenu
  }
};
</script>

<style scoped lang="scss">
</style>
