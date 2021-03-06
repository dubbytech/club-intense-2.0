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
            <v-row dense v-for="child in children" :key="child.id">
                <v-col cols="12" md="4">Name:
                    <v-card class="pa-2" outlined tile>{{child.titleDegree}} {{child.firstName}} {{child.mi}} {{child.lastName}}</v-card>
                </v-col>
                <v-col cols="12" md="2">Date of birth
                    <v-card class="pa-2" outlined tile>{{child.dob}}</v-card>
                </v-col>
                <v-col cols="12" md="2">Gender
                    <v-card class="pa-2" outlined tile>{{child.gender}}</v-card>
                </v-col>
                <v-col cols="12" md="4">
                    <v-btn class="ma-2" tile outlined color="success" @click="editChild(child.id)"><v-icon left>mdi-pencil</v-icon> Edit </v-btn>
                    <v-btn class="ma-2" tile outlined color="error" @click="deleteChild(child.id)"><v-icon left>mdi-trash-can</v-icon> Delete </v-btn>
                </v-col>
            </v-row>
        </v-container>
        <v-container>
            <v-row>
                <v-btn class="ma-2" tile outlined color="success" @click="addChild"><v-icon left>mdi-pencil</v-icon> Add child </v-btn>
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
                <v-col cols="12" md="3">
                    <v-text-field v-model="firstname" :rules="nameRules" :counter="50" label="First name" required></v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                    <v-text-field v-model="mi" :rules="miRules" :counter="2" label="MI" required></v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                    <v-text-field v-model="lastname" :rules="nameRules" :counter="50" label="Last name" required></v-text-field>
                </v-col>
                <v-col cols="12" md="3">
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
            </v-row>
            <v-row>
                <v-col cols="12" md="4">
                    <v-btn :disabled="!valid" color="success" class="mr-4" @click="submitChild">Submit</v-btn>
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
            childId: 0,
            titleDegree: "",
            firstName: "",
            lastName: "",
            mi: "",
            dob: vm.formatDate(new Date().toISOString().substr(0, 10)),
            gender: "",
            genderItems: ["Male", "Female"],
            children: [
                { id: 1, gender: "Female", titleDegree: "Ms.", firstName: "Chukwudumebi", mi: "s", lastName: "Ejikeme", dob: "01/08/2002" },
                { id: 2, gender: "Female", titleDegree: "Ms.", firstName: "Chikosolu", mi: "s", lastName: "Ejikeme", dob: "10/03/2003" },
                { id: 3, gender: "Female", titleDegree: "Ms.", firstName: "Ifenlota", mi: "s", lastName: "Ejikeme", dob: "10/21/2005" },
                { id: 4, gender: "Male", titleDegree: "Mr.", firstName: "Dilichukwu", mi: "s", lastName: "Ejikeme", dob: "05/07/2010" }
            ],
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
            submitChild() {
                alert("submit");
                this.success = true;
                this.error = false;
            },
            deleteChild(id) {
                alert("delete: " + id);
                this.error = true;
                this.success = false;
            },
            addChild() {
                this.reset();
                this.error = false;
                this.success = false;
            },
            editChild(id) {
                alert("edit: " + id);
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
