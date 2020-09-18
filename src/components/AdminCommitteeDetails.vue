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
            <v-row justify="space-between">
                <v-col cols="12" md="5">
                    <div>Available Committees</div>
                    <v-row dense v-for="committee in commiittees" :key="committee.id">
                        <v-col cols="12" md="8">
                            <v-card class="pa-2" outlined tile>{{committee.CommitteeName}}</v-card>
                        </v-col>
                        <v-col cols="6" md="4">
                            <v-btn class="ma-2" tile outlined color="error" @click="deleteCommittee(committee.id)"><v-icon left>mdi-trash-can</v-icon> Delete </v-btn>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col cols="12" md="5">
                    <div>Create committee</div>
                    <v-row>
                        <v-col class="d-flex" cols="12">
                            <v-text-field v-model="committeeName" :rules="committeeRules" :counter="50" label="New Committee" required></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="4">
                            <v-btn :disabled="!valid" color="success" class="mr-4" @click="createCommittee">Create Committee</v-btn>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-container>
    </v-form>
</template>
<script>
    export default {
        data: () => ({
            valid: false,
            inset: false,
            committeeName: "",
            commiittees: [
                { id: 1, CommitteeName: "Hospitality" },
                { id: 2, CommitteeName: "Membership" },
                { id: 3, CommitteeName: "Operation" },
                { id: 4, CommitteeName: "Publicity" },
                { id: 5, CommitteeName: "Welfare" },
                { id: 6, CommitteeName: "Youth Program" }
            ],
            selectedCommitteeId: "",
            createdBy: 0,
            createdTs: null,
            changedBy: 0,
            changedTs: null,
            message: "",
            success: false,
            error: false,
            committeeRules: [
                v => !!v || 'Committee is required',
                v => v.length <= 50 || 'Name must not be more than 50 characters',
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
            createCommittee() {
                alert("added: " + this.committeeName);
                this.error = false;
                this.success = true;
                this.valid = false;
            },
            deleteCommittee(id) {
                alert("delete committee: " + id);
                this.success = false;
                this.error = true;
                this.valid = false
            }
        },
    }
</script>