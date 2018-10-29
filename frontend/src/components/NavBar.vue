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
  <nav class="nav-bar flex space-between">
    <div class="locale-menu" hidden>
      <label for="locale">שפה</label>
      <select v-model="locale">
        <option>he</option>
        <option>en</option>
      </select>
    </div>
    <logo-container/>
    <ul class="clean-list flex">
      <li>
        <router-link to="/">{{$t('home')}}</router-link>
      </li>
      <li>
        <router-link to="/about">{{$t('about')}}</router-link>
      </li>
      <li>
        <router-link to="/login">
          <span>
            {{$t(loginMode)}}
          </span>
        </router-link>
      </li>
      <li>
        <router-link :to="myPage" v-if="user">{{$t('myPage')}}</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import LogoContainer from '@/components/LogoContainer.vue';

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
    LogoContainer
  }
};
</script>

<style scoped lang="scss">
</style>
