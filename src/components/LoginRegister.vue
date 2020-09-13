<template>
    <v-dialog v-model="dialog" max-width="290">
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
    </v-dialog>
</template>

<script>
    export default {
        methods: {
            login: function () {
                this.$emit("update-login");
            },
            register: function () {
                this.$emit("update-register");
            }
        }
    }
</script>

<style scoped>
</style>