import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/Login.vue'
import Welcome from '../views/Home/Welcome.vue'
import UserInformation from '../views/Home/user/UserInformation.vue'
import EventAdd from '../views/Home/blog/EventAdd.vue'
import EventControl from '../views/Home/blog/EventControl.vue'

import SourceControlVue from '../views/Home/tab/SourceControl.vue'

//项目开始写的
import Register from '../views/Register.vue'

Vue.use(VueRouter)

const routes = [

  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path:'/register',
    name:'register',
    component:Register
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
        path: '/source/control',
        name: 'sourcecontrol',
        component: SourceControlVue
      },
      {
        path: '/user/information',
        name: 'userInformation',
        component: UserInformation
      },
      {
        path: '/event/eventadd',
        name: 'eventadd',
        component: EventAdd
      },
      {
        path: '/event/eventcontrol',
        name: 'eventcontrol',
        component: EventControl
      },
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
