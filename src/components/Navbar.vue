<template>
    <div>
        <v-toolbar app dark prominent :src="src">
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
                <Login-register @update-login="login" @update-register="register"></Login-register>
                <!--<v-dialog v-model="dialog" persistent max-width="290">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn text v-bind="attrs" v-on="on">Login/Register</v-btn>
                    </template>
                    <v-card>
                        <v-card-title class="headline">Use Google's location service?</v-card-title>
                        <v-card-text>Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.</v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="green darken-1" text @click="login">Login</v-btn>
                            <v-btn color="green darken-1" text @click="register">Register</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>-->
            </v-toolbar-title>
            <v-toolbar-title v-else>
                <v-btn text class="hidden-sm-and-down" v-for="link in authenticatedlinks" :key="link.text" router :to="link.route">
                    <span>{{ link.text }}</span>
                </v-btn>
            </v-toolbar-title>
        </v-toolbar>

        <v-navigation-drawer v-model="drawer" absolute temporary app class="primary">
            <v-list v-if="!authenticated">
                <!-- v-list-tile is changed to v-list-item -->
                <v-list-item v-for="link in generalLinks" :key="link.text" router :to="link.route">
                    <v-list-item-action>
                        <v-icon class="white--text">{{ link.icon }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title class="white--text">{{ link.text }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item>
                    <v-list-item-action>
                        <v-icon class="white--text">contacts</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-row justify="center">
                            <template>
                                <v-list-item-title class="white--text">
                                    <Login-register @update-login="login" @update-register="register"></Login-register>
                                    <!--<v-dialog v-model="dialog" persistent max-width="290">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn class="white--text" text v-bind="attrs" v-on="on">Login/Register</v-btn>
                                        </template>
                                        <v-card>
                                            <v-card-title class="headline">Use Google's location service?</v-card-title>
                                            <v-card-text>Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.</v-card-text>
                                            <v-card-actions>
                                                <v-spacer></v-spacer>
                                                <v-btn color="green darken-1" text @click="login">Login</v-btn>
                                                <v-btn color="green darken-1" text @click="register">Register</v-btn>
                                            </v-card-actions>
                                        </v-card>
                                    </v-dialog>-->
                                </v-list-item-title>

                            </template>

                        </v-row>

                    </v-list-item-content>
                </v-list-item>
            </v-list>
            <v-list v-else>
                <!-- v-list-tile is changed to v-list-item -->
                <v-list-item v-for="link in authenticatedlinks" :key="link.text" router :to="link.route">
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
    import LoginRegister from "@/components/LoginRegister.vue";

    export default {
        name: "Navbar",
        components: {
            LoginRegister
        },
        data: () => ({
            drawer: false,
            siteTitle: "Organization Name",
            src: "https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg",
            dialog: false,
            authenticated: false,
            authenticatedlinks: [
                { icon: 'contacts', text: 'Home', route: '/' },
                { icon: 'contacts', text: 'About', route: '/about' },
                { icon: 'contacts', text: 'Gallery', route: '/gallery' },
                { icon: 'contacts', text: 'Member Only', route: '/member' },
                { icon: 'contacts', text: 'Admin', route: '/admin' },
                { icon: 'contacts', text: 'Contact', route: '/contact' },
                { icon: 'contacts', text: 'Site Setup', route: '/setup' }
            ],
            generalLinks: [
                { icon: 'contacts', text: 'Home', route: '/' },
                { icon: 'contacts', text: 'About', route: '/about' },
                { icon: 'contacts', text: 'Gallery', route: '/gallery' },
                { icon: 'contacts', text: 'Contact', route: '/contact' }
            ]
        }),
        methods: {
            login: function () {
                this.authenticated = true;
                this.dialog = false;
            },
            register: function () {
                this.authenticated = true;
                this.dialog = false;
            }
        }
    }
</script>

<style scoped>
</style>