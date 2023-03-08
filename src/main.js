import Vue from 'vue'
import App from './App.vue'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from 'axios'

Vue.config.productionTip = false

Vue.use(axios)

let timer = null;

export const debounce = function (fn, delay) {
  clearTimeout(timer);

  timer = setTimeout(fn, delay)
}

export const Axios2 = axios.create({
  baseURL: process.env.VUE_APP_URL,
  timeout: 15000,
  headers: {
    Authorization: localStorage.getItem("id_token"),
    Accept: 'application/json',
    "Access-Control-Allow-Origin": "*",
    'Content-Type': 'application/json',
  }
})

new Vue({
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
