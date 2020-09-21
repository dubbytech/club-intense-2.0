import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home
    },
    {
        path: "/about",
        name: "About",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "about" */ "../views/About.vue")
    },
    {
        path: "/gallery",
        name: "Gallery",
        // route level code-splitting
        // this generates a separate chunk (gallery.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "gallery" */ "../views/Gallery.vue")
    },
    {
        path: "/member",
        name: "Member",
        // route level code-splitting
        // this generates a separate chunk (member.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "member" */ "../views/Member.vue")
    },
    {
        path: "/admin",
        name: "Admin",
        // route level code-splitting
        // this generates a separate chunk (admin.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "admin" */ "../views/Admin.vue")
    },
    {
        path: "/contact",
        name: "Contact",
        // route level code-splitting
        // this generates a separate chunk (contact.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "contact" */ "../views/Contact.vue")
    },
    {
        path: "/setup",
        name: "Setup",
        // route level code-splitting
        // this generates a separate chunk (setup.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "contact" */ "../views/Setup.vue")
    },
    {
        path: "/loginRegister",
        name: "LoginRegister",
        // route level code-splitting
        // this generates a separate chunk (loginRegister.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "contact" */ "../views/LoginRegister.vue")
    }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;
