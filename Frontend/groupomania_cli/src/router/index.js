import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Signup from '../views/Signup.vue'
import Login from '../views/Login.vue'
import Logout from '../views/Logout.vue'
import Account from '../views/Account.vue'
import NotFound from '../views/NotFound.vue'
import Posts from '../views/Posts.vue'
import PostDetails from '../views/PostDetails.vue'

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/logout',
    name: 'Logout',
    component: Logout
  },
  {
    path: '/account',
    name: 'Account',
    component: Account
  },
  {
    path: '/posts/', 
    name: 'Posts',
    component: Posts
  },
  {
    path: '/posts/:id', // indique l'accès aux parameters de l'url
    name: 'PostDetails',
    component: PostDetails,
    props : true // si l'on se rend sur la page on peut accéder à la route paramater avec les props
  },
  {
    path: '/:catchAll(.*)', // avec une regex
    name: 'NotFound',
    component: NotFound
  },
]

const router = createRouter({
  history: createWebHistory(), // problème path réglé ?
  routes
})

export default router
