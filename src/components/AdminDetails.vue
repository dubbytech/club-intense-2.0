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
                    <div>Members as Admin</div>
                    <v-row dense v-for="admin in admins" :key="admin.id">
                        <v-col cols="12" md="8">
                            <v-card class="pa-2" outlined tile>{{admin.userName}}</v-card>
                        </v-col>
                        <v-col cols="6" md="4">
                            <v-btn class="ma-2" tile outlined color="error" @click="deleteMemberFromAdmin(admin)"><v-icon left>mdi-trash-can</v-icon> Delete </v-btn>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col cols="12" md="5">
                    <div>Asign Member As Admin</div>
                    <v-row>
                        <v-col class="d-flex" cols="12">
                            <v-select v-model="selectedUserId" :items="members" label="Member" :rules="adminRules" item-text="fullName" item-value="id" required></v-select>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="4">
                            <v-btn :disabled="!valid" color="success" class="mr-4" @click="asignMemberToAdmin">Asign Member As Admin</v-btn>
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
            admins: [
                { id: 1, userId: 3801, userName: "Stanley Ejikeme" },
                { id: 2, userId: 6322, userName: "Chinwe Ejikeme" }
            ],
            members: [
                { id: 3801, firstName: "Stanley", mi: "U", lastName: "Ejikeme", titleDegree: "Mr.", email: "vastgroupusa@gmail.com", homeTownId: 1, cellPhone: "404-917-3801", fullName: "Mr. Stanley U. Ejikeme" },
                { id: 6322, firstName: "Chinwe", mi: "A", lastName: "Ejikeme", titleDegree: "Dr.", email: "chyccidili@gmail.com", homeTownId: 2, cellPhone: "404-917-6322", fullName: "Dr. Chinwe A. Ejikeme" }
            ],
            selectedUserId: "",
            message: "",
            success: false,
            error: false,
            adminRules: [
                v => !!v || 'Member is required'
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
            asignMemberToAdmin() {
                alert("asign admin: " + this.selectedUserId);
                this.success = true;
                this.error = false;
                this.valid = false;
            },
            deleteMemberFromAdmin(admin) {
                alert("delete member admin table: " + admin.userId);
                this.success = true;
                this.error = false;
                this.valid = false
            }
        },
    }
</script>