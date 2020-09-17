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
                <v-col cols="12">
                    <v-text-field v-model="name" :rules="nameRules" label="Name" required></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <v-text-field v-model="subject" :rules="subjectRules" label="Subject" required></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <v-btn :disabled="!valid" color="success" class="mr-4" @click="sendEmail">Submit</v-btn>
                    <v-btn color="error" class="mr-4" @click="reset">Reset Form</v-btn>
                </v-col>
            </v-row>
        </v-container>
        <!--<v-btn color="warning" @click="resetValidation">Reset Validation</v-btn>-->
    </v-form>
</template>

<script>
    export default {
        data: () => ({
            valid: true,
            name: '',
            nameRules: [
                v => !!v || 'Name is required'
            ],
            email: '',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ],
            select: null,
            items: [
                'Item 1',
                'Item 2',
                'Item 3',
                'Item 4',
            ],
            itemRules: [
                v => !!v || 'Item is required'
            ],
            checkbox: false,
            checkBoxRules: [
                v => !!v || 'You must agree to continue!'
            ],
            subject: "",
            subjectRules: [
                v => !!v || 'subject is required'
            ],
            success: false,
            error: false
        }),

        methods: {
            sendEmail() {
                alert("send email ");
                this.success = true;
                this.error = false;
                this.valid = false;
            },
            reset() {
                this.$refs.form.reset();
                this.valid = false;
                this.success = false;
                this.error = false;
            },
            resetValidation() {
                this.$refs.form.resetValidation()
            },
        },
    }
</script>