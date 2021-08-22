<template>
    <v-form ref="form" v-model="valid" lazy-validation>
        <v-container>

        </v-container>
        <v-container class="grey lighten-5">
            <v-row>
                <v-card-text>
                    <v-form>
                        <v-text-field prepend-icon="person" v-model="email" type="email" id="inputEmail" :rules="emailRules" label="E-mail" class="form-control" placeholder="Enter email address" required></v-text-field>
                    </v-form>
                </v-card-text>
            </v-row>
            <v-row>
                <v-col cols="12" md="4">
                    <v-btn color="success" class="mr-4" @click="onSubmit">Submit</v-btn>
                </v-col>
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
            message: "",
            email: "",
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ]
        }),
        methods: {
            onSubmit() {
                HTTP.post('/api/ForgotPassword/', {
                    Email: this.email
                })
                    .then(response => this.requestSuccessful(response))
                    .catch(response => this.requestFailed(response))
            },
            requestSuccessful(response) {
                console.log(response.data.results.success);
                this.$router.replace(this.$route.query.redirect || "/ForgotPasswordConfirmation");
            },
            requestFailed() {
                this.$router.replace(this.$route.query.redirect || "/ForgotPasswordConfirmation");
            }
        }
    }
</script>

<style scoped>
</style>