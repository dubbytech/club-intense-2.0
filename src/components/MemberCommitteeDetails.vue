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
            <v-row dense v-for="committee in memberCommittees" :key="committee.id">
                <v-col cols="12" md="8">
                    <v-card class="pa-2" outlined tile>{{committee.committee}}</v-card>
                </v-col>
                <v-col cols="6" md="4">
                    <v-btn class="ma-2" tile outlined color="error" @click="deleteCommittee(committee.id)"><v-icon left>mdi-trash-can</v-icon> Delete </v-btn>
                </v-col>
            </v-row>
        </v-container>
        <v-container>
            <v-row>
                <v-btn class="ma-2" tile outlined color="success" @click="addCommittee"><v-icon left>mdi-pencil</v-icon> Add Committee </v-btn>
            </v-row>
            <v-row>
                <v-col class="d-flex" cols="12" md="4">
                    <v-select v-model="selected" :items="committees" label="Committee" required></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="4">
                    <v-btn :disabled="!valid" color="success" class="mr-4" @click="asignCommittee">Asign me to committee</v-btn>
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
            committee: "",
            committees: ["Hospitality", "Membership", "Operation", "Publicity", "Welfare", "Youth Program"],
            memberCommittees: [
                { id: 1, memberId: 7493, committee: "Hospitality" },
                { id: 2, memberId: 7493, committee: "Operation" },
            ],
            selected: "",
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
            asignCommittee() {
                alert("asign: " + this.selected);
                this.success = true;
                this.error = false;
                this.valid = false;
            },
            addCommittee() {
                this.reset();
                this.error = false;
                this.success = false;
            },
            deleteCommittee(id) {
                alert("delete: " + id);
                this.error = true;
                this.success = false;
            }
        },
    }
</script>