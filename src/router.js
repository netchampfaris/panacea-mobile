import Vue from 'vue'
import Login from './views/Login.vue'
import Home from './views/Home.vue'
import Doctor from './views/Doctor.vue'
import NewDoctor from './views/NewDoctor.vue'
import { IonicVueRouter } from '@ionic/vue'

Vue.use(IonicVueRouter)

export default new IonicVueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/doctor',
      name: 'doctor',
      component: Doctor
    },
    {
      path: '/doctor/new',
      name: 'doctor-new',
      component: NewDoctor
    }
  ]
})
