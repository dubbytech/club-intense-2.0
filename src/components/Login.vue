﻿<template>
    <v-form ref="form" v-model="valid" lazy-validation>
        <v-container>
            <!--<v-row v-if="success">
                <v-col>
                    <v-alert dense type="success">
                        Successfully updated.
                    </v-alert>
                </v-col>
            </v-row>
            <v-row v-if="error">
                <v-col>
                    <v-alert dense type="error">
                        Error updating record.
                    </v-alert>
                </v-col>
            </v-row>-->
            <v-row>
                <v-card>
                    <v-card>
                        <v-card-title class="headline">Login</v-card-title>
                        <div class="login-wrapper border border-light">
                            <form class="form-signin" method="post" @submit.prevent="login">
                                <h2 class="form-signin-heading">Please sign in</h2>
                                <label for="inputEmail" class="sr-only">Email address</label>
                                <input v-model="email" type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus>
                                <label for="inputPassword" class="sr-only">Password</label>
                                <input v-model="password" type="password" id="inputPassword" class="form-control" placeholder="Password" required>
                                <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
                            </form>
                        </div>
                    </v-card>
                </v-card>
            </v-row>
        </v-container>
    </v-form>
</template>

<script>
    import { HTTP } from "../http-common.js";

    export default {
        data: () => ({
            valid: false,
            success: "",
            error: "",
            email: "vastgroupusa@gmail.com",
            password: "!@12QAZwsxedcrfv"
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
                console.log(this.email);
                console.log(this.password);

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