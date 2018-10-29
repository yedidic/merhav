import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueI18n from 'vue-i18n';
import moment from 'moment';
Vue.prototype.moment = moment;
import './registerServiceWorker'
import './assets/scss/main.scss';

Vue.use(VueI18n);
const i18n = new VueI18n({
  locale: 'en',
})
Vue.config.productionTip = false

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
