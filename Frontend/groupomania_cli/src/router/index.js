import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Signup from '../views/Signup.vue'
import Login from '../views/Login.vue'
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
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Signup
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Login
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
