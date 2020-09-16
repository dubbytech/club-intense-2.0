<template>
    <v-form ref="form" v-model="valid" lazy-validation>
        <v-container>
            <v-row justify="space-between">
                <v-col cols="12" md="5">
                    <div>Available roles</div>
                    <v-row dense v-for="role in roles" :key="role.id">
                        <v-col cols="12" md="8">
                            <v-card class="pa-2" outlined tile>{{role.name}}</v-card>
                        </v-col>
                        <v-col cols="6" md="4">
                            <v-btn class="ma-2" tile outlined color="error" @click="deleteRole(role.id,role.name)"><v-icon left>mdi-trash-can</v-icon> Delete </v-btn>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col cols="12" md="5">
                    <div>Create role</div>
                    <v-row>
                        <v-col class="d-flex" cols="12">
                            <v-text-field v-model="roleName" :rules="roleRules" :counter="50" label="New role" required></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="4">
                            <v-btn :disabled="!valid" color="success" class="mr-4" @click="createRole">Create Role</v-btn>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-container>
        <v-divider :inset="inset"></v-divider>
        <v-container>
            <v-row justify="space-between">
                <v-col cols="12" md="5">
                    <div>Members and their roles</div>
                    <v-row dense v-for="memberRole in memberRoles" :key="memberRole.id">
                        <v-col cols="12" md="4">
                            <v-card class="pa-2" outlined tile>{{memberRole.userId}}</v-card>
                        </v-col>
                        <v-col cols="12" md="4">
                            <v-card class="pa-2" outlined tile>{{memberRole.role}}</v-card>
                        </v-col>
                        <v-col cols="6" md="4">
                            <v-btn class="ma-2" tile outlined color="error" @click="deleteMemberRole(memberRole.id)"><v-icon left>mdi-trash-can</v-icon> Delete </v-btn>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col cols="12" md="5">
                    <div>Asign member to role</div>
                    <v-row>
                        <v-col class="d-flex" cols="12" md="6">
                            <v-select v-model="selectedRoleId" :items="roles" label="Role" item-text="name" item-value="id" required></v-select>
                        </v-col>
                        <v-col class="d-flex" cols="12" md="6">
                            <v-select v-model="selectedMemberId" :items="members" label="Member" item-text="fullName" item-value="id" required></v-select>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="4">
                            <v-btn :disabled="!valid" color="success" class="mr-4" @click="asignMemberToRole">Asign member to role</v-btn>
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
            roleName: "",
            roles: [
                { id: 1, name: "Webmaster" },
                { id: 2, name: "Treasurer" },
                { id: 3, name: "Vice President" },
                { id: 4, name: "Financial Secretary" },
                { id: 5, name: "Publicity Secretary" },
                { id: 6, name: "President" },
                { id: 7, name: "Membership Director" },
                { id: 8, name: "Public Relations Officer" }
            ],
            memberRoles: [
                { id: 1, userId: 7493, role: "Treasurer" },
                { id: 2, userId: 7493, role: "Publicity Secretary" },
            ],
            members: [
                { id: 1, firstName: "Stanley", mi: "U", lastName: "Ejikeme", titleDegree: "Mr.", email: "vastgroupusa@gmail.com", homeTownId: 1, cellPhone: "404-917-3801", fullName: "Mr. Stanley U. Ejikeme" },
                { id: 2, firstName: "Chinwe", mi: "A", lastName: "Ejikeme", titleDegree: "Dr.", email: "chyccidili@gmail.com", homeTownId: 2, cellPhone: "404-917-6322", fullName: "Dr. Chinwe A. Ejikeme" }
            ],
            selectedRoleId: "",
            selectedMemberId: 0,
            createdBy: 0,
            createdTs: null,
            changedBy: 0,
            changedTs: null,
            message: "",
            success: false,
            error: false,
            roleRules: [
                v => !!v || 'Role is required',
                v => v.length <= 10 || 'Name must be less than 10 characters',
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
            deleteMemberRole(id) {
                alert("delete member role table: " + id);
                this.success = true;
                this.error = false;
                this.valid = false
            }
        },
    }
</script>