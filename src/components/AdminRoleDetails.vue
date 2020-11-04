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
                    <div>Available roles</div>
                    <v-row dense v-for="role in roles" :key="role.id">
                        <v-col cols="12" md="8">
                            <v-card class="pa-2" outlined tile>{{role.name}}</v-card>
                        </v-col>
                        <v-col cols="6" md="4">
                            <v-btn class="ma-2" tile outlined color="error" @click="deleteRole(role.id)"><v-icon left>mdi-trash-can</v-icon> Delete </v-btn>
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
                    <v-row dense v-for="(memberRole,index) in memberRoles" :key="index">
                        <v-col cols="12" md="4">
                            <v-card class="pa-2" outlined tile>{{memberRole.roleName}}</v-card>
                        </v-col>
                        <v-col cols="12" md="4">
                            <v-card class="pa-2" outlined tile>{{memberRole.userName}}</v-card>
                        </v-col>
                        <v-col cols="6" md="4">
                            <v-btn class="ma-2" tile outlined color="error" @click="deleteMemberRole(memberRole.userId,memberRole.roleId)"><v-icon left>mdi-trash-can</v-icon> Delete </v-btn>
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
                            <v-select v-model="selectedAdminId" :items="admins" label="Member" :rules="adminRules" item-text="userName" item-value="id" required></v-select>
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
    import { HTTP } from "../http-common.js";

    export default {
        data: () => ({
            valid: false,
            inset: false,
            roleName: "",
            roles: [],
            memberRoles: [],
            admins: [],
            selectedRoleId: "",
            selectedMemberId: 0,
            selectedAdminId: 0,
            createdBy: 0,
            createdTs: null,
            changedBy: 0,
            changedTs: null,
            message: "",
            success: false,
            error: false,
            roleRules: [
                v => !!v || 'Role is required',
                v => v.length <= 50 || 'Name must be less than 50 characters',
            ],
            adminRules: [
                v => !!v || 'Member is required'
            ]
        }),
        created() {
            this.getRoles();
            this.getMemberAndRoles();
            this.getAdmins();
        },
        methods: {
            getAdmins() {
                HTTP.get('/api/Admin/')
                    .then(response => this.populateAdmin(response.data.results.data))
                    .catch(() => this.getFailed())
            },
            populateAdmin(data) {
                this.admins = data;
            },
            getRoles() {
                HTTP.get('/api/Role/')
                    .then(response => this.populateRoles(response.data.results.data))
                    .catch(() => this.getFailed())
            },
            populateRoles(data) {
                this.roles = data;
            },
            getMemberAndRoles() {
                HTTP.get('/api/MemberRole/')
                    .then(response => this.populateMemberRole(response.data.results.data))
                    .catch(() => this.getFailed())
            },
            populateMemberRole(data) {
                this.memberRoles = data;
            },
            asignMemberToRole() {
                alert("asign role: " + this.selectedRoleId + " assign member: " + this.selectedMemberId);
                this.success = true;
                this.error = false;
                this.valid = false;
            },
            createRole() {
                alert("added: " + this.roleName);
                HTTP.post('/api/Role/', {
                    id: this.roleName,
                    name: this.roleName,
                    normalizedName: "",
                    concurrencyStamp: ""
                })
                    .then(() => this.saveSuccessful())
                    .catch(() => this.saveFailed())
            },
            deleteRole(id) {
                HTTP.delete('/api/Role/' + id)
                    .then(() => this.saveSuccessful())
                    .catch(() => this.saveFailed())
            },
            deleteMemberRole(id) {
                alert("delete member role table: " + id);
                this.success = true;
                this.error = false;
                this.valid = false
            },
            getFailed() {

            },
            saveSuccessful() {
                this.success = true;
                this.error = false;
                this.getRoles();
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
<style scoped>
   
</style>