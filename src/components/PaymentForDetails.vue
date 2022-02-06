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
                        Error updating record:<br />
                        <span>{{message}}</span>
                    </v-alert>
                </v-col>
            </v-row>
            <v-row justify="space-between">
                <v-col cols="12" md="5">
                    <div>
                        <h1>Available Payment For</h1>
                    </div>
                    <v-row dense v-for="paymentFor in paymentFors" :key="paymentFor.id">
                        <v-col class="d-flex" cols="12" md="8">
                            <v-card class="pa-2" outlined tile>{{paymentFor.paymentName}}</v-card>
                        </v-col>
                        <v-col cols="6" md="4">
                            <v-btn class="ma-2" tile outlined color="error" @click="deletePaymentFor(paymentFor.id)"><v-icon left>mdi-trash-can</v-icon> Delete </v-btn>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col cols="12" md="5">
                    <div>
                        <h1>Create Payment For</h1>
                    </div>
                    <v-row>
                        <v-col class="d-flex" cols="12">
                            <v-text-field v-model="paymentName" :rules="paymentForRules" :counter="100" label="New Payment For" required></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="4">
                            <v-btn :disabled="!valid" color="success" class="mr-4" @click="createPaymentFor">Create PaymentFor</v-btn>
                        </v-col>
                    </v-row>
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
            inset: false,
            id: 0,
            paymentName: "",
            paymentFors: [],
            createdBy: 0,
            createdTs: null,
            changedBy: 0,
            changedTs: null,
            message: "",
            success: false,
            error: false,
            paymentForRules: [
                v => !!v || 'Payment For is required',
                v => v.length <= 100 || 'Name must not be more than 100 characters',
            ]
        }),
        created() {
            this.getPaymentFors();
        },
        methods: {
            getPaymentFors() {
                HTTP.get('/api/PaymentFor/')
                    .then(response => this.populatePaymentFors(response.data.results.data))
                    .catch(response => this.responseMessage(response))
            },
            populatePaymentFors(data) {
                this.paymentFors = data;
            },
            createPaymentFor() {
                //alert("added: " + this.paymentName);
                HTTP.post('/api/PaymentFor/', {
                    id: this.id,
                    paymentName: this.paymentName
                })
                    .then(response => this.responseMessage(response))
                    .catch(response => this.responseMessage(response))
            },
            deletePaymentFor(id) {
                //alert("delete paymentName: " + id);
                HTTP.delete('/api/PaymentFor/' + id)
                    .then(response => this.responseMessage(response))
                    .catch(response => this.responseMessage(response))
            },
            responseMessage(response) {
                this.message = response.data.results.message;
                this.success = response.data.results.success;
                this.error = !this.success;
                if (this.success) this.getPaymentFors();
            },
            validate() {
                this.$refs.form.validate();
            },
            reset() {
                this.$refs.form.reset();
                this.valid = false;
            },
            resetValidation() {
                this.$refs.form.resetValidation()
            }
        },
    }
</script>