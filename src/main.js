import Vue from "vue";
import app from "./App.vue";
import router from "./router";
import { store } from "./store/store";
import vuetify from "./plugins/vuetify";
import ckEditor from "@ckeditor/ckeditor5-vue";
import { HTTP } from "./http-common.js";
import vueSessionStorage from "vue-sessionstorage";
//import qs from "qs";

Vue.config.productionTip = false;
Vue.use(ckEditor);
Vue.use(HTTP);
Vue.use(vueSessionStorage);

//Vue.use(qs);

new Vue({
    router,
    store,
    vuetify,
    render: h => h(app)
}).$mount("#app");
