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
                <v-col cols="12" md="6">
                    <v-text-field v-model="titleDegree" :rules="titleRules" :counter="50" label="Title" required></v-text-field>
                </v-col>
                <v-col class="d-flex" cols="12" md="6">
                    <v-select v-model="gender" :items="genderItems" label="Gender" required></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="4">
                    <v-text-field v-model="firstName" :rules="nameRules" :counter="50" label="First name" required></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                    <v-text-field v-model="mi" :rules="miRules" :counter="2" label="MI"></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                    <v-text-field v-model="lastName" :rules="nameRules" :counter="50" label="Last name" required></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="4">
                    <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                    <v-text-field v-model="address1" :rules="addressRules1" :counter="50" label="Address1" required></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                    <v-text-field v-model="address2" :counter="50" label="Address2"></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="4">
                    <v-text-field v-model="city" :rules="cityRules" :counter="50" label="City" required></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                    <v-text-field v-model="state" :rules="stateRules" :counter="2" label="State" required></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                    <v-text-field v-model="zipCode" :rules="zipCodeRules" :counter="5" label="Zip code" required></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="4">
                    <v-menu ref="menu1" v-model="menu1" :close-on-content-click="false" transition="scale-transition" offset-y max-width="290px" min-width="290px">
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field v-model="dob"
                                          label="Date of birth"
                                          hint="MM/DD/YYYY format"
                                          persistent-hint
                                          v-bind="attrs"
                                          required
                                          v-on="on"></v-text-field>
                        </template>
                        <v-date-picker v-model="date" no-title @input="menu1 = false"></v-date-picker>
                    </v-menu>
                </v-col>
                <v-col cols="12" md="4">
                    <v-text-field v-model="cellPhone" :rules="cellPhoneRules" :counter="11" label="Cell phone" required></v-text-field>
                </v-col>
                <v-col class="d-flex" cols="12" md="4">
                    <v-select v-model="homeTownId" :items="hometowns" label="Home town" item-text="name" item-value="id" required></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="4">
                    <v-btn :disabled="!valid" color="success" class="mr-4" @click="submitProfile">Submit</v-btn>
                    <v-btn color="error" class="mr-4" @click="deleteProfile"><v-icon left>mdi-trash-can</v-icon> Delete </v-btn>
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
            id: "0",
            titleDegree: "",
            firstName: "",
            lastName: "",
            mi: "",
            email: "",
            address1: "",
            address2: "",
            city: "",
            state: "",
            zipCode: "",
            dob: "",
            gender: "",
            genderItems: ["Male", "Female"],
            hometowns: [],
            homeTownId: 0,
            cellPhone: "",
            imageId: "",
            createdBy: 0,
            createdTs: null,
            changedBy: 0,
            changedTs: null,
            message: "",
            success: false,
            error: false,
            nameRules: [
                v => !!v || 'Name is required',
                v => v.length <= 50 || 'Name must not be greater than 50 characters',
            ],
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+/.test(v) || 'E-mail must be valid',
            ],
            zipCodeRules: [
                v => !!v || 'Zip code is required',
                v => v.length <= 5 || 'Zip code must not be greater than 5 characters',
            ],
            titleRules: [
                v => !!v || 'Title is required',
                v => v.length <= 50 || 'Title must not be greater than 50 characters',
            ],
            miRules: [
                v => v.length <= 2 || 'Title must not be greater than 2 characters',
            ],
            addressRules1: [
                v => !!v || 'Address1 is required',
                v => v.length <= 50 || 'Address1 must not be greater than 50 characters',
            ],
            cityRules: [
                v => !!v || 'City is required',
                v => v.length <= 50 || 'City must not be greater than 50 characters',
            ],
            stateRules: [
                v => !!v || 'State is required',
                v => v.length <= 2 || 'State must not be greater than 2 characters',
            ],
            cellPhoneRules: [
                v => !!v || 'Cell Phone is required',
                v => v.length <= 11 || 'Cell Phone must not be greater than 11 characters',
            ],
            date: new Date().toISOString().substr(0, 10),
            menu1: false,
            menu2: false,
        }),
        created() {
            this.getHomeTowns();
            this.getProfile();
        },
        computed: {
            computedDateFormatted() {
                return this.formatDate(this.date)
            },
        },
        watch: {
            date() {
                this.dob = this.formatDate(this.date)
            },
        },
        methods: {
            getProfile() {
                HTTP.get('/api/member/0')
                    .then(response => this.populateProfile(response.data.results.data))
                    .catch(() => this.getFailed())
            },
            populateProfile(data) {
                this.titleDegree = data.titleDegree;
                this.firstName = data.firstName;
                this.lastName = data.lastName;
                this.mi = data.mi;
                this.email = data.email;
                this.address1 = data.address1;
                this.address2 = data.address2;
                this.city = data.city;
                this.state = data.state;
                this.zipCode = data.postalCode;
                this.dob = this.formatDate(data.dob);
                this.date = new Date(data.dob).toISOString().substr(0, 10);
                this.gender = data.gender;
                this.homeTownId = data.homeTownId;
                this.cellPhone = data.cellPhone;
            },
            getHomeTowns() {
                HTTP.get('/api/HomeTown/')
                    .then(response => this.populateHomeTowns(response.data.results.data))
                    .catch(() => this.getFailed())
            },
            populateHomeTowns(data) {
                this.hometowns = data;
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
            submitProfile() {
                HTTP.post('/api/member/', {
                    id: this.id,
                    titleDegree: this.titleDegree,
                    firstName: this.firstName,
                    lastName: this.lastName,
                    mi: this.mi,
                    email: this.email,
                    address1: this.address1,
                    address2: this.address2,
                    city: this.city,
                    state: this.state,
                    postalCode: this.zipCode,
                    dob: new Date(this.dob),
                    gender: this.gender,
                    homeTownId: this.homeTownId,
                    cellPhone: this.cellPhone
                })
                    .then(response => this.responseMessage(response))
                    .catch(response => this.responseMessage(response))
            },
            responseMessage(response) {
                this.message = response.data.results.message;
                this.success = response.data.results.success;
                this.error = !this.success;
            },
            deleteProfile() {
                HTTP.delete('/api/member/0', {
                    id: this.id,
                })
                    .then(response => this.responseMessage(response))
                    .catch(response => this.responseMessage(response))
            },
            formatDate(date) {
                if (!date) return null

                const [year, month, day] = date.split('-');
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