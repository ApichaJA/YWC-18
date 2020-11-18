import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

import VueAxios from "vue-axios";
import axios from "axios";


Vue.use(VueRouter)

Vue.use(VueAxios, axios);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
]

const router = new VueRouter({
  routes
})

export default router
