import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: HomeView,
    meta: { useCustomAppBar: false}
  },

  {
    path: "/searchpage",
    name: "searchpage",
    component: () => import("../views/SearchPage.vue"),
    meta: { useCustomAppBar: true}
    
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
