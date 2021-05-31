import { createRouter, createWebHashHistory } from 'vue-router'
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
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/signup',
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
    path: '/posts/:id', // ou mettre posts/:id ?
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
  history: createWebHashHistory(),
  routes
})

export default router
