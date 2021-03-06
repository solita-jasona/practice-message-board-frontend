import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component:  () => import(/* webpackChunkName: "login" */ '../views/LoginView.vue')
  },
  {
    path: '/register',
    name: 'register',
    component:  () => import(/* webpackChunkName: "register" */ '../views/RegisterView.vue')
  },
  {
    path: '/add-topic',
    name: 'addTopic',
    component:  () => import(/* webpackChunkName: "addTopic" */ '../views/AddTopicView.vue')
  },
  {
    path: '/messages',
    name: 'messages',
    props: true,
    component:  () => import(/* webpackChunkName: "messages" */ '../views/MessagesView.vue')
  },
  {
    path: '/edit-topic',
    name: 'editTopic',
    props: true,
    component:  () => import(/* webpackChunkName: "editTopic" */ '../views/EditTopicView.vue')
  },
  {
    path: '/edit-message',
    name: 'editMessage',
    props: true,
    component:  () => import(/* webpackChunkName: "editMessage" */ '../views/EditMessageView.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
