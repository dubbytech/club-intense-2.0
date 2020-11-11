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
                    <div>Select member to view payments for that member</div>
                    <v-row>
                        <v-col class="d-flex" cols="12">
                            <v-select v-model="memberIdView" :items="members" label="Member" item-text="fullName" item-value="id" required @change="getMemberPayments"></v-select>
                        </v-col>
                    </v-row>
                    <v-row dense v-for="memberPayment in memberPayments" :key="memberPayment.id">
                        <v-col cols="12" md="1">
                            Date of payment:
                            <v-card class="pa-2" outlined tile>{{memberPayment.dateOfPayment}}</v-card>
                        </v-col>
                        <v-col cols="12" md="1">
                            Payment for:
                            <v-card class="pa-2" outlined tile>{{memberPayment.paymentFor}}</v-card>
                        </v-col>
                        <v-col cols="12" md="1">
                            Payment amount:
                            <v-card class="pa-2" outlined tile>{{memberPayment.paymentAmount}}</v-card>
                        </v-col>
                        <v-col cols="12" md="1">
                            Payment method:
                            <v-card class="pa-2" outlined tile>{{memberPayment.paymentMethod}}</v-card>
                        </v-col>
                        <v-col cols="12" md="1">
                            Fiscal year:
                            <v-card class="pa-2" outlined tile>{{memberPayment.fiscalYear}}</v-card>
                        </v-col>
                        <v-col cols="12" md="1">
                            Date posted:
                            <v-card class="pa-2" outlined tile>{{memberPayment.CreatedTs}}</v-card>
                        </v-col>
                        <v-col cols="12" md="1">
                            Posted by:
                            <v-card class="pa-2" outlined tile>{{memberPayment.CreatedBy}}</v-card>
                        </v-col>
                        <v-col cols="12" md="4">
                            Notes:
                            <v-card class="pa-2" outlined tile>{{memberPayment.notes}}</v-card>
                        </v-col>
                        <v-col cols="6" md="1">
                            <v-btn class="ma-2" tile outlined color="error" @click="deleteMemberPayment(memberPayment.id)"><v-icon left>mdi-trash-can</v-icon> Delete </v-btn>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-container>
        <v-divider :inset="inset"></v-divider>
        <v-container>
            <v-row>
                <v-col cols="12">
                    <div>Select member to add payment for that member</div>
                    <v-row>
                        <v-col class="d-flex" cols="12">
                            <v-select v-model="memberIdAdd" :items="members" label="Member" item-text="fullName" item-value="id" required></v-select>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
            <v-row>
                <v-col class="d-flex" cols="12" md="2">
                    <v-select v-model="selectedPaymentFor" :items="paymentFor" label="Payment for" item-text="paymentName" item-value="paymentName" required></v-select>
                </v-col>
                <v-col class="d-flex" cols="12" md="2">
                    <v-select v-model="selectedPaymentMethod" :items="paymentMethod" label="Payment method" item-text="methodName" item-value="methodName" required></v-select>
                </v-col>
                <v-col class="d-flex" cols="12" md="1">
                    <v-select v-model="fiscalYear" :items="fiscalYears" label="Fiscal year" item-text="year" item-value="year" required></v-select>
                </v-col>
                <v-col cols="12" md="2">
                    <v-menu ref="menu1" v-model="menu1" :close-on-content-click="false" transition="scale-transition" offset-y max-width="290px" min-width="290px">
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field v-model="paymentDate"
                                          label="Date of receipt"
                                          hint="MM/DD/YYYY format"
                                          persistent-hint
                                          prepend-icon="event"
                                          v-bind="attrs"
                                          @blur="date = parseDate(dateFormatted)"
                                          required
                                          v-on="on"></v-text-field>
                        </template>
                        <v-date-picker v-model="date" no-title @input="menu1 = false"></v-date-picker>
                    </v-menu>
                </v-col>
                <v-col class="d-flex" cols="12" md="1">
                    <v-text-field v-model="paymentAmount" :rules="paymentAmountRules" label="Payment Amount" required></v-text-field>
                </v-col>
                <v-col class="d-flex" cols="12" md="4">
                    <v-textarea clearable row-height="10" name="input-7-1" filled label="Notes" auto-grow v-model="notes"></v-textarea>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <v-btn :disabled="!valid" color="success" class="mr-4" @click="addPayment">Add payment</v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-form>
</template>
<script>
    import { HTTP } from "../http-common.js";

    export default {
        data: vm => ({
            valid: false,
            inset: false,
            memberPayments: [],
            members: [],
            paymentFor: [
                { id: 1, paymentName: "Registration Fee" },
                { id: 2, paymentName: "Onyeama Contribution" },
                { id: 3, paymentName: "Inauguration Levy" },
                { id: 4, paymentName: "Membership Dues" },
                { id: 5, paymentName: "Women Uniform" },
                { id: 6, paymentName: "Pot Luck" },
                { id: 7, paymentName: "Music Launching" },
                { id: 8, paymentName: "Men Uniform" },
                { id: 9, paymentName: "Picnic" }
            ],
            paymentMethod: [
                { id: 1, methodName: "Cash" },
                { id: 2, methodName: "Check" },
                { id: 3, methodName: "Money Order" },
                { id: 4, methodName: "Zelle" },
                { id: 5, methodName: "Cash Out" }
            ],
            fiscalYears: [
                { id: 1, year: new Date().getFullYear() - 2 },
                { id: 2, year: new Date().getFullYear() - 1 },
                { id: 3, year: new Date().getFullYear() },
                { id: 4, year: new Date().getFullYear() + 1 },
                { id: 5, year: new Date().getFullYear() + 2 },
            ],
            paymentDate: vm.formatDate(new Date().toISOString().substr(0, 10)),
            notes: "",
            selectedRoleId: "",
            memberIdView: "",
            memberIdAdd: "",
            selectedPaymentFor:"",
            selectedPaymentMethod: "",
            fiscalYear: "",
            paymentAmount: 0.00,
            paymentAmountRules: [
                v => !!v || 'Payment Amount is required'
            ],
            date: new Date().toISOString().substr(0, 10),
            menu1: false,
            menu2: false,
            createdBy: 0,
            createdTs: null,
            changedBy: 0,
            changedTs: null,
            message: "",
            success: false,
            error: false,
        }),
        created() {
            this.getMembers();
        },
        computed: {
            computedDateFormatted() {
                return this.formatDate(this.date);
            }
        },
        watch: {
            date() {
                this.paymentDate = this.formatDate(this.date)
            },
        },
        methods: {
            getMembers() {
                HTTP.get('/api/Member/')
                    .then(response => this.populateMember(response.data.results.data))
                    .catch(() => this.getFailed())
            },
            populateMember(data) {
                this.members = data;
            },
            getMemberPayments() {
                this.memberPayments = null;
                HTTP.get('/api/MemberPayment/' + this.memberIdView)
                    .then(response => this.populateMemberPayments(response.data.results.data))
                    .catch(() => this.getFailed())
            },
            populateMemberPayments(data) {
                this.memberPayments = data;
                console.log(this.memberPayments);
            },
            getFailed() {

            },
            saveSuccessful() {
                this.success = true;
                this.error = false;
                //this.getRoles();
            },
            saveFailed() {
                this.success = false;
                this.error = true;
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
            },
            addPayment() {
                alert("payment added: " + this.date);
                HTTP.post('/api/MemberPayment/', {
                    id: 0,
                    memberId: this.memberIdAdd,
                    paymentFor: this.selectedPaymentFor,
                    paymentMethod: this.selectedPaymentMethod,
                    paymentAmount: parseFloat(this.paymentAmount),
                    fiscalYear: this.fiscalYear.toString(),
                    dateOfPayment: this.date,
                    notes: this.notes
                })
                    .then(() => this.saveSuccessful())
                    .catch(() => this.saveFailed())
            },
            deleteMemberPayment(id) {
                alert("deleted: " + id);
                this.error = true;
                this.success = false;
            },
            formatDate(date) {
                if (!date) return null

                const [year, month, day] = date.split('-')
                return `${month}/${day}/${year}`
            },
            parseDate(date) {
                if (!date) return null

                const [month, day, year] = date.split('/')
                return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
            }
        },
    }
</script>