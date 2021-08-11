<template>
    <v-form ref="form" v-model="valid" lazy-validation>
        <v-container>
            <v-row v-if="success">
                <v-col cols="12">
                    <v-alert dense type="success">
                        User has been registered successfully.
                    </v-alert>
                </v-col>
            </v-row>
            <v-row v-if="error">
                <v-col cols="12">
                    <v-alert dense type="error">
                        {{message}}
                    </v-alert>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="4">
                    <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="4">
                    <v-btn :disabled="!valid" color="success" class="mr-4" @click="registerMember">Register</v-btn>
                </v-col>
            </v-row>
        </v-container>
        <v-container>
            <v-row>
                <v-col cols="12">
                    <v-card-text>
                        <p class="text--primary">
                            New registered member will receive an email to complete the registration and validation process.
                        </p>
                        <p class="text--primary">
                            Please remind new registered member to be sure to check spam folders too for the email if not in inbox folder.
                        </p>
                    </v-card-text>
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
            email: "vastgroupusa@gmail.com",
            password: "!@12QAZwsxedcrfv",
            message: "",
            success: false,
            error: false,
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+/.test(v) || 'E-mail must be valid',
            ]
        }),
        methods: {
            validate() {
                this.$refs.form.validate();
            },
            reset() {
                this.$refs.form.reset();
                this.valid = false;
            },
            resetValidation() {
                this.$refs.form.resetValidation()
            },
            registerMember() {
                HTTP.post('/api/Register/', {
                    Email: this.email,
                    Password: this.password,
                    ConfirmPassword:this.password
                })
                    .then(response => this.registerSuccessful(response.data))
                    .catch(response => this.registerFailed(response.data))
            },
            registerSuccessful(data) {
                console.log(data);
                if (data.success) {
                    this.success = true;
                    this.error = false;
                }
                else {
                    this.success = false;
                    this.error = true;
                    this.message = data.text;
                }
            },
            registerFailed(data) {
                this.success = false;
                this.error = true;
                this.message = data.text;
            }
        },
    }
</script>