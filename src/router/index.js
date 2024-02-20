import { createRouter, createWebHistory } from 'vue-router'
import store from "@/store";
import LoginView from "@/views/LoginView.vue";
import Logout from "@/components/Logout.vue";
import AboutView from "@/views/AboutView.vue";
import WorkshiftView from "@/views/WorkshiftView.vue";
import Signup from "@/components/Signup.vue";
import Cook from "@/components/Cook.vue";

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next()
    return
  }
  next('/about')
}

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next()
    return
  }
  next('/login')
}

const routes = [
  {
    path: '/about',
    name: 'about',
    component: AboutView,
    beforeEnter: ifAuthenticated
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    beforeEnter: ifNotAuthenticated
  },
  {
    path: '/logout',
    name: 'logout',
    component: Logout,
    beforeEnter: ifAuthenticated
  },
  {
    path: '/work-shift',
    name: 'work-shift',
    component: WorkshiftView,
    beforeEnter: ifAuthenticated
  },
  {
    path: '/user',
    name: 'user',
    component: Signup,
    beforeEnter: ifAuthenticated
  },
  {
    path: '/orders',
    name: 'cook',
    component: Cook,
    beforeEnter: ifAuthenticated
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
