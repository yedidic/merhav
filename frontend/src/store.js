import Vue from 'vue'
import Vuex from 'vuex'
import UserModule from './modules/UserModule'
import ExamModule from './modules/ExamModule'
import QuestModule from './modules/QuestModule'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    
  },
  mutations: {

  },
  actions: {

  },
  modules:{
    UserModule,
    ExamModule,
    QuestModule,
  }
})
