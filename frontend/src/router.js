import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Student from './views/Student.vue'
import Quest from './views/Quest.vue'
import StudentStats from './views/StudentStats.vue'
import Login from './views/Login.vue'
import Teacher from './views/Teacher.vue'
import SuccessQuest from './views/SuccessQuest.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/student',
      name: 'student',
      component: Student
    },
    {
      path: '/student/quest',
      name: 'quest',
      component: Quest
    },
    {
      path: '/student/quest/success',
      name: 'quest-success',
      component: SuccessQuest
    },
    {
      path: '/student/stats',
      component: StudentStats,
      children: [
        {
          name: 'StudentAnsAvg',
          path: '',
          component: () => import('./components/charts/student/StudentAnsAvg.vue')
        },
        {
          name: 'StudentAggregateChart',
          path: 'aggregate',
          component: () => import('./components/charts/student/StudentAggregateChart.vue')
        },
        {
          name: 'StudentSumbissionsStats',
          path: 'submissions',
          component: () => import('./components/charts/student/StudentSumbissionsStats.vue')
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/teacher/:headmaster?',
      name: 'teacher',
      component: Teacher,
    }
  ]
})
