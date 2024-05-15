import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
Vue.prototype.$http = axios
axios.defaults.baseURL = 'http://192.168.10.223:8012'


//富文本编辑器挂载
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme
Vue.use(VueQuillEditor, /* { default global options } */)
//
import ElementUI, { Message } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import './assets/css/global.css'

Vue.config.productionTip = false
Vue.prototype.$message = Message
Vue.prototype.$confirm = Message.confirm

Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
