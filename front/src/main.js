import Vue from 'vue'
import './plugins/axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from "axios"
import App from './App.vue'
import router from './router'
import store from './store'
import Vuex from 'vuex'
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(ElementUI);
Vue.use(Vant);
Vue.use(Vuex) ;
Vue.config.productionTip = false
let instance=axios.create({})
Vue.prototype.$ajax= axios;
instance.interceptors.request.use(
  config=>{
      return config;
  },
  err=>{
      Dialog({message: '请求超时'})
      return Promise.reject(err)
  }
)
instance.interceptors.response.use(
  response=>{
      if(response.data.statusCode == 200){
          return response.data;
      }
      else{
          Dialog({message:"请求错误，服务器返回："+response.data.message})
          return Promise.reject(response.data.message);
      }
  },err =>{
      Dialog({message:"发生错误！"+err})
      return Promise.reject(err);
  }
)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
