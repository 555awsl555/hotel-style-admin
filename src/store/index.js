import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sbossId:"",
    jobName:"",
    //该用户的id
    Sid:""
  },
  getters: {
  },
  mutations: {
    SET_SBOSSID(state,sbossId){
      state.sbossId = sbossId;
      console.log("vuex中设置 sbossId 为 ",state.sbossId)
    },
    SET_JOBNAME(state,jobName){
      state.jobName = jobName;
      console.log("vuex中设置 jobName 为 ",state.jobName)
    },
    SET_SID(state,Sid){
      state.Sid = Sid;
      console.log("vuex中设置 Sid 为 ",state.Sid)
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState({
    storage:window.sessionStorage,
    paths:['sbossId','jobName','Sid']
})]
})
