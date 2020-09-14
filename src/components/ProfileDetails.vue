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
                    <v-text-field v-model="titleDegree" :rules="titleRules" label="Title" required></v-text-field>
                </v-col>
                <v-col class="d-flex" cols="12" md="6">
                    <v-select :items="genderItems" label="Gender" required></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="4">
                    <v-text-field v-model="firstname" :rules="nameRules" :counter="50" label="First name" required></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                    <v-text-field v-model="mi" :rules="miRules" :counter="2" label="MI" required></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                    <v-text-field v-model="lastname" :rules="nameRules" :counter="50" label="Last name" required></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="4">
                    <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                    <v-text-field v-model="address1" :rules="addressRules" :counter="50" label="Address1" required></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                    <v-text-field v-model="address2" :rules="addressRules" :counter="50" label="Address2" required></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="4">
                    <v-text-field v-model="city" :rules="cityRules" :counter="50" label="City" required></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                    <v-text-field v-model="state" :rules="stateRules" :counter="50" label="State" required></v-text-field>
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
                                          prepend-icon="event"
                                          v-bind="attrs"
                                          @blur="date = parseDate(dateFormatted)"
                                          required
                                          v-on="on"></v-text-field>
                        </template>
                        <v-date-picker v-model="date" no-title @input="menu1 = false"></v-date-picker>
                    </v-menu>
                </v-col>
                <v-col cols="12" md="4">
                    <v-text-field v-model="cellPhone" :rules="cellPhoneRules" :counter="10" label="Cell phone" required></v-text-field>
                </v-col>
                <v-col class="d-flex" cols="12" md="4">
                    <v-select :items="homeTowns" label="Home town" required></v-select>
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
    export default {
        data: vm => ({
            valid: false,
            memberId: 0,
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
            dob: vm.formatDate(new Date().toISOString().substr(0, 10)),
            gender: "",
            genderItems: ["Male", "Female"],
            homeTowns: ["Abatete", "Nkpor", "Umuoji"],
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
                v => v.length <= 10 || 'Name must be less than 10 characters',
            ],
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+/.test(v) || 'E-mail must be valid',
            ],
            date: new Date().toISOString().substr(0, 10),
            menu1: false,
            menu2: false,
        }),
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
                alert("submit");
                this.success = true;
                this.error = false;
            },
            deleteProfile() {
                alert("delete");
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