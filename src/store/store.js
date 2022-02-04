import vue from "vue";
import vuex from "vuex";
//import router from "./router";

vue.use(vuex);

export const store = new vuex.Store({
    state: {
        authenticated: false
    },
    mutations: {
        change(state, authenticated) {
            state.authenticated = authenticated;
        }
    },
    getters: {
        authenticated: state => state.authenticated
    },
    actions: {},
    modules: {}
});
