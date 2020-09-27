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
                    <v-text-field v-model="name" :rules="nameRules" :counter="50" label="Club name" required></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="6">
                    <v-text-field v-model="address1" :rules="address1Rules" :counter="50" label="Address1" required></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                    <v-text-field v-model="address2" :counter="50" label="Address2"></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="4">
                    <v-text-field v-model="city" :rules="cityRules" :counter="50" label="City" required></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                    <v-text-field v-model="state" :rules="stateRules" label="State" required></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                    <v-text-field v-model="zipCode" :rules="zipCodeRules" :counter="5" label="Zip code" required></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="4">
                    <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                    <v-text-field v-model="phone" :rules="phoneRules" :counter="10" label="Phone" required></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                    <v-text-field v-model="fax" :counter="10" label="Fax"></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col class="d-flex" cols="12" md="4">
                    <v-select :items="siteTypes" :rules="siteRules" v-model="selectedSiteTypeId" item-text="category" item-value="id" label="Site type" required></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="4">
                    <v-btn :disabled="!valid" color="success" class="mr-4" @click="submitSiteInfo">Submit</v-btn>
                    <v-btn color="error" class="mr-4" @click="deleteSiteInfo"><v-icon left>mdi-trash-can</v-icon> Delete </v-btn>
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
            siteId: 0,
            name: "",
            email: "",
            address1: "",
            address2: "",
            city: "",
            state: "",
            zipCode: "",
            siteTypes: [],
            selectedSiteTypeId: "",
            phone: "",
            fax: "",
            imageId: "",
            createdBy: 0,
            createdTs: "",
            changedBy: 0,
            changedTs: null,
            message: "",
            success: false,
            error: false,
            nameRules: [
                v => !!v || 'Name is required',
                v => v.length <= 50 || 'Name must not be greater than 50 characters',
            ],
            address1Rules: [
                v => !!v || 'Address1 is required',
                v => v.length <= 50 || 'Name must not be greater than 50 characters',
            ],
            address2Rules: [
                v => v.length <= 50 || 'Address2 must not be greater than 50 characters',
            ],
            phoneRules: [
                v => !!v || 'Phone is required',
                v => v.length <= 10 || 'Name must not be greater than 10 characters',
            ],
            faxRules: [
                v => v.length <= 10 || 'Name must not be greater than 10 characters',
            ],
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+/.test(v) || 'E-mail must be valid',
                v => v.length <= 50 || 'E-mail must not be greater than 50 characters'
            ],
            siteRules: [
                v => !!v || 'Site type is required',
            ],
            zipCodeRules: [
                v => !!v || 'Zip code is required',
                v => v.length <= 5 || 'Zip code must not be greater than 5 characters',
            ],
            cityRules: [
                v => !!v || 'City is required',
                v => v.length <= 50 || 'City must not be greater than 50 characters',
            ],
            stateRules: [
                v => !!v || 'State is required'
            ],
        }),
        created() {
            this.getBusinessTypes();
            this.getSiteInfo();
        },
        mounted() {

        },
        methods: {
            getBusinessTypes() {
                HTTP.get('/api/businessType/')
                    .then(response => this.populateBusinessType(response.data.results.data))
                    .catch(() => this.getFailed())
            },
            getSiteInfo() {
                HTTP.get('/api/siteinfo/')
                    .then(response => this.populateSiteInfo(response.data.results.data[0]))
                    .catch(() => this.getFailed())
            },
            submitSiteInfo() {
                alert("submit");
                HTTP.post('/api/siteinfo/', {
                    id: 0,
                    name: this.name,
                    address1: this.address1,
                    address2: this.address2,
                    city: this.city,
                    state: this.state,
                    postalCode: this.zipCode,
                    siteTypeId: this.selectedSiteTypeId,
                    phone: this.phone,
                    email: this.email,
                    fax: this.fax,
                    imageId: 0,

                })
                    .then(() => this.saveSuccessful())
                    .catch(() => this.saveFailed())
            },
            deleteSiteInfo() {
                alert("delete");
                this.error = true;
                this.success = false;
            },
            populateSiteInfo(data) {
                //console.log(data);
                this.siteId = data.id;
                this.name = data.name;
                this.address1 = data.address1;
                this.address2 = data.address2;
                this.city = data.city;
                this.state = data.state;
                this.zipCode = data.postalCode;
                this.email = data.email;
                this.phone = data.phone;
                this.fax = data.fax;
                this.selectedSiteTypeId = data.siteTypeId;
            },
            populateBusinessType(data) {
                //console.log(data);
                this.siteTypes = data;
                //console.log(this.siteTypes);
            },
            getFailed() {
                console.log("get failed");
            },
            saveSuccessful() {
                this.success = true;
                this.error = false;
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
        },
    }
</script>