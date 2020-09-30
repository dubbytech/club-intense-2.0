import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { store } from "./store/store";
import vuetify from "./plugins/vuetify";
import CKEditor from "@ckeditor/ckeditor5-vue";
import { HTTP } from "./http-common.js";
import VueSessionStorage from "vue-sessionstorage";
//import qs from "qs";

Vue.config.productionTip = false;
Vue.use(CKEditor);
Vue.use(HTTP);
Vue.use(VueSessionStorage);

//Vue.use(qs);

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount("#app");
