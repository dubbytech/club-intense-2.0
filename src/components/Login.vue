<template>
    <v-app id="inspire">
        <v-content>
            <v-container fluid fill-height>
                <v-layout align-center justify-center>
                    <v-flex xs12 sm8 md4>
                        <form method="post" @submit.prevent="onSubmit" @reset.prevent="onCancel">
                            <v-card class="elevation-12">
                                <v-toolbar dark color="primary">
                                    <v-toolbar-title>Login form</v-toolbar-title>
                                </v-toolbar>
                                <v-row v-if="error">
                                    <v-col cols="12">
                                        <v-alert dense type="error">
                                            {{message}}
                                        </v-alert>
                                    </v-col>
                                </v-row>
                                <v-card-text>
                                    <v-form>
                                        <v-text-field prepend-icon="person" v-model="email" type="email" id="inputEmail" :rules="emailRules" label="E-mail" class="form-control" placeholder="Enter email address" required></v-text-field>
                                        <v-text-field prepend-icon="lock" v-model="password" type="password" id="inputPassword" :rules="passwordRules" label="Password" class="form-control" placeholder="Enter password" required></v-text-field>
                                    </v-form>
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="primary" type="submit" class="form-control float-right">Login</v-btn>
                                    <v-btn color="default" type="reset" class="form-control float-right">Clear</v-btn>
                                </v-card-actions>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <a href="/ForgotPassword">Forgot my password</a>
                                </v-card-actions>
                            </v-card>
                        </form>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
    </v-app>
</template>
<script>
    import { HTTP } from "../http-common.js";
    export default {
        data: () => ({
            valid: false,
            success: "",
            error: "",
            message: "",
            email: "vastgroupusa@gmail.com",
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ],
            password: "!@12QAZwsxedcrfv",
            passwordRules: [
                v => !!v || 'Password is required'
            ],
            user: {
                authenticated: false,
                email: ""
            },
        }),
        created() {

        },
        updated() {

        },
        mounted() {

        },
        methods: {
            onSubmit() {
                HTTP.post('/api/Login/', {
                    Email: this.email,
                    Password: this.password,
                    RememberMe: false,
                })
                    .then(response => this.loginSuccessful(response))
                    .catch(response => this.loginFailed(response))
            },
            onCancel() {
                this.email = "";
                this.password = "";
            },

            checkCurrentLogin() {

            },
            loginSuccessful(response) {
                //console.log(response.data.results.success);
                if (response.data.results.success == true) {
                    this.user.authenticated = true;
                    this.user.email = this.email;
                    this.$session.set("user", this.user);
                    this.$router.replace(this.$route.query.redirect || response.data.results.data);
                    window.location.reload();
                }
                else {
                    //console.log(response.data.results);
                    this.error = true;
                    this.user.authenticated = false;
                    this.user.email = null;
                    this.$session.set("user", this.user);
                    this.message = response.data.results.message;
                    //this.$router.replace(this.$route.query.redirect || response.data.results.data);
                    //window.location.reload();
                }
            },
            loginFailed(response) {
                this.error = true;
                this.user.authenticated = false;
                this.user.email = null;
                this.$session.set("user", this.user);
                this.message = response.data.results.message;
                //this.$router.replace(this.$route.query.redirect || response.data.results.data);
                //window.location.reload();
            },
        }
    }
</script>

<style scoped>
</style>