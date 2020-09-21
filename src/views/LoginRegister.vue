<template>
    <v-form ref="form" v-model="valid" lazy-validation>
        <v-container>
            <v-row v-if="success">
                <v-col cols="12">
                    <v-alert dense type="success">
                        Successfully updated.
                    </v-alert>
                </v-col>
            </v-row>
            <v-row v-if="error">
                <v-col cols="12">
                    <v-alert dense type="error">
                        Error updating record.
                    </v-alert>
                </v-col>
            </v-row>
            <v-row>
                <v-card>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn class="white--text" text v-bind="attrs" v-on="on">Login/Register</v-btn>
                    </template>
                    <v-card v-if="showLogin">
                        <v-card-title class="headline">Login</v-card-title>
                        <v-card-text>Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.</v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="green darken-1" text @click="login">Login</v-btn>
                            <v-btn color="green darken-1" text @click="register">Register</v-btn>
                        </v-card-actions>
                    </v-card>
                    <v-card v-else>
                        <v-card-title class="headline">Register</v-card-title>
                        <v-card-text>Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.</v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="green darken-1" text @click="login">Login</v-btn>
                            <v-btn color="green darken-1" text @click="register">Register</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-card>
            </v-row>
        </v-container>
    </v-form>

</template>

<script>
    export default {
        data: () => ({
            authenticated: false,
            showLogin: true,
            success: false,
            error: false
        }),
        methods: {
            login() {
                this.showLogin = true;
                this.authenticated = true;
                this.success = true;
                this.error = false;
                this.valid = false;
            },
            register() {
                this.showLogin = false;
                this.authenticated = true;
                this.success = true;
                this.error = false;
                this.valid = false;
            }
        }
    }
</script>

<style scoped>
</style>