import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import CKEditor from "@ckeditor/ckeditor5-vue";
import { HTTP } from "./http-common.js";

Vue.config.productionTip = false;
Vue.use(CKEditor);
Vue.use(HTTP);

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount("#app");
