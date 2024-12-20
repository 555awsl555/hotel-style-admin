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
import StaffApprove from '../views/Home/approve/StaffApprove.vue'
import OperatingRecord from '../views/Home/operating/OperatingRecord.vue'
import RoomType from '../views/Home/room/RoomType.vue'
import RoomInformation from '../views/Home/room/RoomInformation.vue'
import RoomClean from '../views/Home/room/RoomClean.vue'
import ClientInformation from '../views/Home/client/ClientInformation.vue'
import AddClient from '../views/Home/client/AddClient.vue'

import Reserve from '../views/Home/service/Reserve.vue'
import ReserveInformation from '../views/Home/service/ReserveInformation.vue'
import Order from '../views/Home/service/Order.vue'
import OrderInformation from '../views/Home/service/OrderInformation.vue'
import Payment from '../views/Home/service/Payment.vue'

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
      {
        path:'/staffApprove',
        name: 'staffapprove',
        component: StaffApprove
      },
      {
        path:'/operatingRecord',
        name:'operatingRecord',
        component: OperatingRecord
      },
      {
        path:'/roomType',
        name:'roomType',
        component:RoomType
      },
      {
        path:'/roomInformation',
        name:'roomInformation',
        component:RoomInformation
      },
      {
        path:'/roomClean',
        name:'roomClean',
        component:RoomClean
      },
      {
        path:'/clientInformation',
        name:'clientInformation',
        component:ClientInformation
      },
      {
        path:'/addClient',
        name:'addClient',
        component:AddClient
      },
      {
        path:'/reserve',
        name:'reserve',
        component:Reserve
      },
      {
        path:'/reserveInformation',
        name:'reserveInformation',
        component:ReserveInformation
      },
      {
        path:'/order',
        name:'order',
        component:Order
      },
      {
        path:'/orderInformation',
        name:'orderInformation',
        component:OrderInformation
      },
      {
        path:'/payment',
        name:'payment',
        component:Payment
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
