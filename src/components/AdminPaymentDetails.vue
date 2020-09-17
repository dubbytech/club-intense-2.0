<template>
    <v-form ref="form" v-model="valid" lazy-validation>
        <v-container>
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

            </v-row>
        </v-container>
    </v-form>
</template>
<script>
    export default {
        data: () => ({
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
            selectedRoleId: "",
            MemberIdPaymentView: 0,
            MemberIdPaymentAdd: 0,
            createdBy: 0,
            createdTs: null,
            changedBy: 0,
            changedTs: null,
            message: "",
            success: false,
            error: false,
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
            asignMemberToRole() {
                alert("asign role: " + this.selectedRoleId + " assign member: " + this.selectedMemberId);
                this.success = true;
                this.error = false;
                this.valid = false;
            },
            createRole() {
                this.reset();
                alert("added: " + this.roleName);
                this.error = false;
                this.success = false;
                this.valid = false;
            },
            deleteRole(id, name) {
                alert("delete: " + id + " name: " + name);
                this.error = true;
                this.success = false;
            },
            deleteMemberPayment(id) {
                alert("delete member payment table: " + id);
                this.success = true;
                this.error = false;
                this.valid = false
            }
        },
    }
</script>