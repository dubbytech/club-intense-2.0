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
        </v-container>
        <v-container class="grey lighten-5">
            <v-row dense v-for="bus in businesses" :key="bus.id">
                <v-col cols="12" md="8">
                    <v-card class="pa-2" outlined tile>{{bus.companyName}}</v-card>
                </v-col>
                <v-col cols="6" md="4">
                    <v-btn class="ma-2" tile outlined color="success" @click="editBusiness(bus.id)"><v-icon left>mdi-pencil</v-icon> Edit </v-btn>
                    <v-btn class="ma-2" tile outlined color="error" @click="deleteBusiness(bus.id)"><v-icon left>mdi-trash-can</v-icon> Delete </v-btn>
                </v-col>
            </v-row>
        </v-container>
        <v-container>
            <v-row>
                <v-btn class="ma-2" tile outlined color="success" @click="addBusiness"><v-icon left>mdi-pencil</v-icon> Add Business </v-btn>
            </v-row>
            <v-row>
                <v-col cols="12" md="6">
                    <v-text-field v-model="companyName" :rules="busNameRules" label="Business Name" required></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                    <v-text-field v-model="email" :rules="busEmailRules" label="Business Email" required></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="6">
                    <v-text-field v-model="address1" :rules="busAddressRules" :counter="50" label="Address1" required></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                    <v-text-field v-model="address2" :rules="busAddressRules" :counter="50" label="Address2" required></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="4">
                    <v-text-field v-model="city" :rules="busCityRules" :counter="50" label="City" required></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                    <v-text-field v-model="state" :rules="busStateRules" :counter="50" label="State" required></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                    <v-text-field v-model="postalCode" :rules="busPostalCodeRules" :counter="5" label="Zip code" required></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="4">
                    <v-text-field v-model="companyPhone" :rules="companyPhoneRules" :counter="10" label="Business phone" required></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                    <v-text-field v-model="companyFax" :rules="companyFaxRules" :counter="10" label="Business fax"></v-text-field>
                </v-col>
                <v-col class="d-flex" cols="12" md="4">
                    <v-select :items="businessTypes" label="Business Type" required></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="4">
                    <v-btn :disabled="!valid" color="success" class="mr-4" @click="submitBusiness">Submit</v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-form>
</template>

<script>
    export default {
        data: () => ({
            valid: false,
            memberId: 0,
            id: 0,
            companyName: "",
            email: "",
            address1: "",
            address2: "",
            city: "",
            state: "",
            postalCode: "",
            businessTypes: [
                { id: 1, Category: "Personal Care & Services" },
                { id: 2, Category: "Education" },
                { id: 3, Category: "Manufacturing" }
            ],
            businesses: [
                { id: 1, businessTypeId: 1, companyName: "Devease", address1: "320 Stallings Dr.", address2: "", city: "McDonough", state: "GA", postalCode: "30252" }
            ],
            businessTypeId: 0,
            companyPhone: "",
            companyFax: "",
            createdBy: 0,
            createdTs: null,
            changedBy: 0,
            changedTs: null,
            message: "",
            success: false,
            error: false,
            nameRules: [
                v => !!v || 'Name is required',
                v => v.length <= 10 || 'Name must be less than 10 characters',
            ],
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
            submitBusiness() {
                alert("submit");
                this.success = true;
                this.error = false;
                this.valid = false;
            },
            addBusiness() {
                this.reset();
                this.error = false;
                this.success = false;
            },
            deleteBusiness(id) {
                alert("delete: " + id);
                this.error = true;
                this.success = false;
            },
            editBusiness(id) {
                alert("edit: " + id);
            },
        },
    }
</script>