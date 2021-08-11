<template>
    <div>
        <v-toolbar dark prominent :src="src">
            <v-app-bar-nav-icon class="grey--text hidden-md-and-up" @click="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title class="grey--text">
                <!--<span class="font-weight-light">Site</span>-->
                <span>{{siteTitle}}</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>

            <v-toolbar-title v-if="!authenticated">
                <v-btn text class="hidden-sm-and-down" v-for="link in generalLinks" :key="link.text" router :to="link.route">
                    <span>{{ link.text }}</span>
                </v-btn>
            </v-toolbar-title>
            <v-toolbar-title v-else>
                <v-btn text class="hidden-sm-and-down" v-for="link in authenticatedLinks" :key="link.text" router :to="link.route">
                    <span>{{ link.text }}</span>
                </v-btn>
            </v-toolbar-title>
        </v-toolbar>

        <v-navigation-drawer v-model="drawer" absolute temporary class="primary">
            <v-list v-if="!authenticated">
                <v-list-item v-for="link in generalLinks" :key="link.text" router :to="link.route">
                    <v-list-item-action>
                        <v-icon class="white--text">{{ link.icon }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title class="white--text">{{ link.text }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
            <v-list v-else>
                <!--//authenticated links-->
                <v-list-item v-for="link in authenticatedLinks" :key="link.text" router :to="link.route">
                    <v-list-item-action>
                        <v-icon class="white--text">{{ link.icon }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title class="white--text">{{ link.text }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>

<script>
    import { HTTP } from "../http-common.js";
    //import LoginRegister from "@/components/LoginRegister";

    export default {
        name: "Navbar",
        components: {
            //LoginRegister
        },
        data: () => ({
            drawer: false,
            siteTitle: "",
            src: "https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg",
            dialog: false,
            member: null,
            authenticated: false,
            errors: [],
            authenticatedLinks: [
                { icon: 'contacts', text: 'Home', route: '/' },
                { icon: 'contacts', text: 'About', route: '/about' },
                { icon: 'contacts', text: 'Gallery', route: '/gallery' },
                { icon: 'contacts', text: 'Member Only', route: '/member' },
                { icon: 'contacts', text: 'Admin', route: '/admin' },
                { icon: 'contacts', text: 'Contact', route: '/contact' }

            ],
            generalLinks: [
                { icon: 'contacts', text: 'Home', route: '/' },
                { icon: 'contacts', text: 'About', route: '/about' },
                { icon: 'contacts', text: 'Gallery', route: '/gallery' },
                { icon: 'contacts', text: 'Contact', route: '/contact' },
                { icon: 'contacts', text: 'Login', route: '/login' }
            ]
        }),
        beforeDestroy() {

        },
        created() {
            this.getSiteInfo();
        },
        mounted() {
            if (this.$session.get('authenticated')) {
                this.authenticated = true;
            }
            else {
                this.authenticated = false;
            }
        },
        updated() {
            //alert("updated");
        },
        watch: {

        },
        methods: {
            getSiteInfo() {
                HTTP.get('/api/siteinfo/')
                    .then(response => this.populateSiteInfo(response.data.results.data[0]))
                    .catch(() => this.getFailed())
            },
            populateSiteInfo(data) {
                //console.log(data);
                this.siteTitle = data.name;
            },
            getFailed() {
                console.log("get failed");
            },
        }

    }
</script>

<style scoped>
</style>