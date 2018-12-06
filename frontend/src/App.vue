<template>
  <div id="app" :class="{rtl: locale==='he'}">
    <nav-bar :user="user" :myPage="getMyPageByUserType" :loginMode="login"></nav-bar>

    <router-view/>
    <modal v-if="modalData" @toggleModal="toggleModal">
      <student-answers-modal :data="modalData"></student-answers-modal>
    </modal>
  </div>
</template>


<script>
import Modal from "@/components/Modal.vue";
import StudentAnswersModal from "@/components/Teacher/StudentAnswersModal.vue";
import Bus, { OPEN_MODAL } from "@/services/EventBusService";
import { RELOGIN_USER } from "./modules/UserModule";
import NavBar from "./components/NavBar.vue";
export default {
  data() {
    return {
      locale: "he",
      modalData: null
    };
  },

  created() {
    this.$i18n.locale = "he";
    this.moment.locale("he");
    this.reloginUserFromLocalStorage();

    Bus.$on(OPEN_MODAL, this.toggleModal);
  },
  methods: {
    reloginUserFromLocalStorage() {
      console.log("%c TODO: relogin the user here", "color:lightskyblue;");
      this.$store.dispatch({ type: RELOGIN_USER });
    },
    toggleModal(modalData) {
      document.body.classList.remove("stop-scrolling");
      if (modalData) document.body.classList.add("stop-scrolling");
      this.modalData = modalData;
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
      if (!this.user) return "";
      if (this.user.type === "s") return "/student";
      if (this.user.type === "t") return "/teacher";
      if (this.user.type === "h") return "/teacher/headmaster";
    },
    login() {
      if (this.user) return "logout";
      return "login";
    }
  },
  components: {
    NavBar,
    Modal,
    StudentAnswersModal
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
