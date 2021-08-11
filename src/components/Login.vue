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
                                <v-card-text>
                                    <v-form>
                                        <v-text-field prepend-icon="person" v-model="email" type="email" id="inputEmail" :rules="emailRules" label="E-mail" class="form-control" placeholder="Enter email address" required></v-text-field>
                                        <v-text-field prepend-icon="lock" v-model="password" type="password" id="inputPassword" :rules="passwordRules" label="Password" class="form-control" placeholder="Enter password" required></v-text-field>
                                    </v-form>
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="primary" type="submit" class="form-control float-right">Login</v-btn>
                                    <v-btn color="default" type="reset" class="form-control float-right">Cancel</v-btn>
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
            email: "vastgroupusa@gmail.com",
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ],
            password: "!@12QAZwsxedcrfv",
            passwordRules: [
                v => !!v || 'Password is required'
            ],
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
                    .catch(() => this.loginFailed())
            },
            onCancel() {
                this.email = "";
                this.password = "";
            },

            checkCurrentLogin() {

            },
            loginSuccessful(response) {
                console.log(response);
                this.$session.set("authenticated", true);
                this.$router.replace(this.$route.query.redirect || '/');
                window.location.reload();
            },
            loginFailed(response) {
                console.log(response);
                this.$session.set("authenticated", false);
                this.$router.replace(this.$route.query.redirect || '/');
                window.location.reload();
            }
        }
    }
</script>

<style scoped>
</style>