<template>
    <v-form ref="form" v-model="valid" lazy-validation>
        <v-container class="grey lighten-5">
            <v-row dense v-for="committee in memberPayments" :key="committee.id">
                <v-col cols="12" md="1">
                    Date of payment:
                    <v-card class="pa-2" outlined tile>{{committee.dateOfPayment}}</v-card>
                </v-col>
                <v-col cols="12" md="1">
                    Payment for:
                    <v-card class="pa-2" outlined tile>{{committee.paymentForId}}</v-card>
                </v-col>
                <v-col cols="12" md="1">
                    Payment amount:
                    <v-card class="pa-2" outlined tile>{{committee.paymentAmount}}</v-card>
                </v-col>
                <v-col cols="12" md="1">
                    Payment method:
                    <v-card class="pa-2" outlined tile>{{committee.paymentMethod}}</v-card>
                </v-col>
                <v-col cols="12" md="1">
                    Fiscal year:
                    <v-card class="pa-2" outlined tile>{{committee.fiscalYear}}</v-card>
                </v-col>
                <v-col cols="12" md="1">
                    Date posted:
                    <v-card class="pa-2" outlined tile>{{committee.CreatedTs}}</v-card>
                </v-col>
                <v-col cols="12" md="1">
                    Posted by:
                    <v-card class="pa-2" outlined tile>{{committee.CreatedBy}}</v-card>
                </v-col>
                <v-col cols="12" md="5">
                    Notes:
                    <v-card class="pa-2" outlined tile>{{committee.notes}}</v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-form>
</template>

<script>
    export default {
        data: () => ({
            valid: false,
            memberPayments: [
                { id: 1, memberId: 7493, paymentForId: 1, paymentMethod: "Cash", paymentAmount: "200.00", fiscalYear: "2020", dateOfPayment: "10/10/2020", notes: "This is a test note", CreatedBy: 7493, CreatedTs: "10/12/2020" },
                { id: 2, memberId: 7493, paymentForId: 2, paymentMethod: "Check", paymentAmount: "50.00", fiscalYear: "2019", dateOfPayment: "10/10/2019", notes: "This is a test note2", CreatedBy: 7493, CreatedTs: "10/12/2020" }
            ],
            message: "",
        }),
        methods: {

        },
    }
</script>