import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Signup from '../views/Signup.vue'
import Login from '../views/Login.vue'
import NotFound from '../views/NotFound.vue'
import Posts from '../views/Posts.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/api/auth/signup',
    name: 'Signup',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Signup
  },
  {
    path: '/api/auth/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Login
  },
  {
    path: '/api/posts/', // ou mettre posts/:id ?
    name: 'Posts',
    component: Posts
  },
  {
    path: '/:catchAll(.*)', // avec une regex
    name: 'NotFound',
    component: NotFound
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
