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
                            <v-select v-model="MemberIdPaymentView" :items="members" label="Member" item-text="fullName" item-value="id" required></v-select>
                        </v-col>
                    </v-row>
                    <v-row dense v-for="memberPayment in memberPayments" :key="memberPayment.id">
                        <v-col cols="12" md="1">
                            Date of payment:
                            <v-card class="pa-2" outlined tile>{{memberPayment.dateOfPayment}}</v-card>
                        </v-col>
                        <v-col cols="12" md="1">
                            Payment for:
                            <v-card class="pa-2" outlined tile>{{memberPayment.paymentForId}}</v-card>
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
                            <v-select v-model="MemberIdPaymentAdd" :items="members" label="Member" item-text="fullName" item-value="id" required></v-select>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
            <v-row>
                <v-col class="d-flex" cols="12" md="2">
                    <v-select v-model="paymentForId" :items="paymentFor" label="Payment for" item-text="paymentName" item-value="id" required></v-select>
                </v-col>
                <v-col class="d-flex" cols="12" md="2">
                    <v-select v-model="paymentMethodId" :items="paymentMethods" label="Payment method" item-text="methodName" item-value="id" required></v-select>
                </v-col>
                <v-col class="d-flex" cols="12" md="1">
                    <v-select v-model="fiscalYearId" :items="fiscalYears" label="Fiscal year" item-text="year" item-value="id" required></v-select>
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
                    <v-text-field v-model="paymentAmount" :rules="paymentAmountRules" :counter="10" label="Payment Amount" required></v-text-field>
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
    export default {
        data: vm => ({
            valid: false,
            inset: false,
            memberPayments: [
                { id: 1, memberId: 7493, paymentForId: 1, paymentMethod: "Cash", paymentAmount: "200.00", fiscalYear: "2020", dateOfPayment: "10/10/2020", notes: "This is a test note", CreatedBy: 7493, CreatedTs: "10/12/2020" },
                { id: 2, memberId: 7493, paymentForId: 2, paymentMethod: "Check", paymentAmount: "50.00", fiscalYear: "2019", dateOfPayment: "10/10/2019", notes: "This is a test note2", CreatedBy: 7493, CreatedTs: "10/12/2020" }
            ],
            members: [
                { id: 1, firstName: "Stanley", mi: "U", lastName: "Ejikeme", titleDegree: "Mr.", email: "vastgroupusa@gmail.com", homeTownId: 1, cellPhone: "404-917-3801", fullName: "Mr. Stanley U. Ejikeme" },
                { id: 2, firstName: "Chinwe", mi: "A", lastName: "Ejikeme", titleDegree: "Dr.", email: "chyccidili@gmail.com", homeTownId: 2, cellPhone: "404-917-6322", fullName: "Dr. Chinwe A. Ejikeme" }
            ],
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
            paymentMethods: [
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
            MemberIdPaymentView: 0,
            MemberIdPaymentAdd: 0,
            paymentForId: 0,
            fiscalYearId: 0,
            paymentAmount: 0,
            paymentAmountRules: [
                v => !!v || 'Payment Amount is required',
                v => v.length <= 10 || 'Payment Amount must be less than 10 characters',
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
        computed: {
            computedDateFormatted() {
                return this.formatDate(this.date)
            },
        },
        watch: {
            date() {
                this.paymentDate = this.formatDate(this.date)
            },
        },
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
            addPayment() {
                alert("payment added: " + this.notes);
                this.success = true;
                this.error = false;
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