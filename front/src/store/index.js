import Vue from 'vue';
import Vuex from 'vuex';
 
Vue.use(Vuex);
 
export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token') ? localStorage.getItem('token') : '',
    iflogin:false,
    me:"你还没有登录，请登录",
    he:"去登录",
    user:null,
  },
  getters: {
},
  mutations: {
    setToken (state,token) {
      state.token =token;
      localStorage.setItem("token",token.token);
    },
    delToken (state) {
      state.token = '';
      localStorage.removeItem("token");
    }
  },
  actions: {
  },
  modules: {
  }
})