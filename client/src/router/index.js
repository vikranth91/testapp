import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import AddPost from "../components/Posts/AddPost.vue"
import Post from "../components/Posts/Post.vue"
import Profile from "../components/Auth/Profile.vue"
import Signin from "../components/Auth/Signin.vue"
import Signup from "../components/Auth/Signup.vue"
import authGuard from '../authGuard.js'


Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'home',
    component: Home,
    beforeEnter: authGuard
  },
  {
    path: '/signup',
    name: 'signup',
    component: Signup
  },
  {
    path: '/signin',
    name: 'signin',
    component: Signin
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
    beforeEnter: authGuard
  },
  {
    path: '/post/add',
    name: 'addpost',
    component: AddPost,
    beforeEnter: authGuard
  },
  {
    path: '/posts',
    name: 'post',
    component: Post,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router