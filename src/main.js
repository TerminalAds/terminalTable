import Vue from "vue";
import { ir } from "./check_domain_ir";
import App from "./App.vue";
import store from "./store";
import vuetify from "./plugins/vuetify";
import axios from "axios";

Vue.config.productionTip = false;
Vue.prototype.$appUrl = ir(process.env.VUE_APP_URL);
Vue.use(axios);

export const Axios2 = axios.create({
  baseURL: Vue.prototype.$appUrl,
  timeout: 15000,
  headers: {
    Authorization: localStorage.getItem("id_token"),
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
});

new Vue({
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
