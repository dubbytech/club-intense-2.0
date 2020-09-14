<template>
    <v-form  ref="form" v-model="valid" lazy-validation>
        <v-container>
            <v-row>
                <v-col cols="12" md="4">
                    <v-text-field v-model="firstname" :rules="nameRules" :counter="10" label="First name" required></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                    <v-text-field v-model="lastname" :rules="nameRules" :counter="10" label="Last name" required></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                    <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="4">
                    <v-btn :disabled="!valid" color="success" class="mr-4" @click="submit">Submit</v-btn>
                    <v-btn color="error" class="mr-4" @click="reset">Reset Form</v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-form>
</template>

<script>
    export default {
        data: () => ({
            valid: false,
            firstname: '',
            lastname: '',
            nameRules: [
                v => !!v || 'Name is required',
                v => v.length <= 10 || 'Name must be less than 10 characters',
            ],
            email: '',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+/.test(v) || 'E-mail must be valid',
            ],
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
            submit() {
                alert("submit");
                this.reset();
            }
        },
    }
</script>