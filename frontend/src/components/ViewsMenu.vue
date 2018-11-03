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
    <ul class="views-menu clean-list flex align-center">
        <li>
            <router-link to="/">{{$t('home')}}</router-link>
        </li>
        <!-- <li>
            <router-link to="/about">{{$t('about')}}</router-link>
        </li> -->
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
</template>

<script>
import { Slide } from 'vue-burger-menu';
export default {
  name: 'views-menu',
  props: {
    user: Object,
    myPage: String,
    loginMode: String
  },
  components:{
  }
};
</script>

<style scoped lang="scss">
</style>
