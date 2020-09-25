import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
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
