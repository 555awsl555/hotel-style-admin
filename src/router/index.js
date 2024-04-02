import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/Login.vue'
import Welcome from '../views/Home/Welcome.vue'
import UserInformation from '../views/Home/user/UserInformation.vue'
import BlogList from '../views/Home/blog/BlogList.vue'
import BlogAdd from '../views/Home/blog/BlogAdd.vue'
import Detail from '../views/Home/blog/Detail.vue'
import BlogControl from '../views/Home/blog/BlogControl.vue'

import TabControlVue from '../views/Home/tab/TabControl.vue'

Vue.use(VueRouter)

const routes = [

  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    redirect: '/welcome',
    children:[
      {
        path: '/welcome',
        name: 'welcome',
        component: Welcome
      },
      {
        path: '/tab/control',
        name: 'tabcontrol',
        component: TabControlVue
      },
      {
        path: '/user/information',
        name: 'userInformation',
        component: UserInformation
      },
      {
        path: '/blog/bloglist',
        name: 'bloglist',
        component: BlogList
      },
      {
        path: '/blog/blogadd',
        name: 'blogadd',
        component: BlogAdd
      },
      {
        path: '/blog/blogcontrol',
        name: 'blogcontrol',
        component: BlogControl
      },
      {
        path: '/blog/detail/:id',
        component: Detail
      }
    ]
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
