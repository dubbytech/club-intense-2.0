<template>
    <v-app id="inspire">
        <v-content>
            <v-container fluid fill-height>
                <v-layout align-center justify-center>
                    <v-flex xs12 sm8 md4>
                        <form method="post" @submit.prevent="login">
                            <v-card class="elevation-12">
                                <v-toolbar dark color="primary">
                                    <v-toolbar-title>Login form</v-toolbar-title>
                                </v-toolbar>
                                <v-card-text>
                                    <v-form>
                                        <v-text-field prepend-icon="person" v-model="email" type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus></v-text-field>
                                        <v-text-field prepend-icon="lock" v-model="password" type="password" id="inputPassword" class="form-control" placeholder="Password" required></v-text-field>
                                    </v-form>
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="primary" type="submit">Login</v-btn>
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
            email: "",
            password: ""
        }),
        created() {

        },
        updated() {

        },
        mounted() {
            //HTTP.get('Identity/Account/Login')
            //    .then(function (response) {
            //        console.log(response);
            //    })
            //    .catch(function (error) {
            //        console.log(error);
            //    });
        },
        methods: {
            login() {
                this.email = "vastgroupusa@gmail.com";
                this.password = "!@12QAZwsxedcrfv";
                //console.log(this.email);
                //console.log(this.password);

                HTTP.post('Identity/Account/Login', {
                    Email: this.email,
                    Password: this.password,
                    RememberMe: ""
                })
                    .then(response => this.loginSuccessful(response))
                    .catch(() => this.loginFailed())

            },
            checkCurrentLogin() {

            },
            loginSuccessful() {
                this.$session.set("authenticated", true);
                this.$router.replace(this.$route.query.redirect || '/');
                window.location.reload();
            },
            loginFailed() {
                alert("failed");
                this.$session.set("authenticated", true);
                this.$router.replace(this.$route.query.redirect || '/');
                window.location.reload();
            }
        }
    }
</script>

<style scoped>
    body {
        background: #605B56;
    }

    .login-wrapper {
        background: #fff;
        width: 70%;
        margin: 12% auto;
    }

    .form-signin {
        max-width: 330px;
        padding: 10% 15px;
        margin: 0 auto;
    }

        .form-signin .form-signin-heading,
        .form-signin .checkbox {
            margin-bottom: 10px;
        }

        .form-signin .checkbox {
            font-weight: normal;
        }

        .form-signin .form-control {
            position: relative;
            height: auto;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            padding: 10px;
            font-size: 16px;
        }

            .form-signin .form-control:focus {
                z-index: 2;
            }

        .form-signin input[type="email"] {
            margin-bottom: -1px;
            border-bottom-right-radius: 0;
            border-bottom-left-radius: 0;
        }

        .form-signin input[type="password"] {
            margin-bottom: 10px;
            border-top-left-radius: 0;
            border-top-right-radius: 0;
        }
</style>