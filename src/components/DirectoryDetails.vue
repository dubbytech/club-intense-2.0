<template>
    <v-form ref="form" v-model="valid" lazy-validation>
        <v-container class="grey lighten-5">
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
            <v-row dense v-for="member in members" :key="member.id">
                <v-col cols="12" md="1">
                    Title/Degree:
                    <v-card class="pa-2" outlined tile>{{member.titleDegree}}</v-card>
                </v-col>
                <v-col cols="12" md="2">
                    First name:
                    <v-card class="pa-2" outlined tile>{{member.firstName}}</v-card>
                </v-col>
                <v-col cols="12" md="1">
                    Mi:
                    <v-card class="pa-2" outlined tile>{{member.mi}}</v-card>
                </v-col>
                <v-col cols="12" md="2">
                    Last name:
                    <v-card class="pa-2" outlined tile>{{member.lastName}}</v-card>
                </v-col>
                <v-col cols="12" md="2">
                    Email:
                    <v-card class="pa-2" outlined tile>{{member.email}}</v-card>
                </v-col>
                <v-col cols="12" md="1">
                    Home town:
                    <v-card class="pa-2" outlined tile>{{member.homeTownId}}</v-card>
                </v-col>
                <v-col cols="12" md="1">
                    Cell phone:
                    <v-card class="pa-2" outlined tile>{{member.cellPhone}}</v-card>
                </v-col>
                <v-col v-if="isAdmin" cols="12" md="2">
                    <v-btn class="ma-2" tile outlined color="error" @click="deleteMember(member.id)"><v-icon left>mdi-trash-can</v-icon> Delete </v-btn>
                </v-col>
                <v-col v-else cols="12" md="2">
                    <v-btn class="ma-2" tile outlined color="error" disabled><v-icon left>mdi-trash-can</v-icon> Delete </v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-form>
</template>

<script>
    export default {
        props: {
            isAdmin: Boolean
        },
        data: () => ({
            valid: false,
            //showDelete: this.isAdmin,
            members: [
                //{ id: 1, firstName: "Stanley", mi: "U", lastName: "Ejikeme", titleDegree: "Mr.", email: "vastgroupusa@gmail.com", homeTownId: 1, cellPhone: "404-917-3801", fullName: "Mr. Stanley U. Ejikeme" },
                //{ id: 2, firstName: "Chinwe", mi: "A", lastName: "Ejikeme", titleDegree: "Dr.", email: "chyccidili@gmail.com", homeTownId: 2, cellPhone: "404-917-6322", fullName: "Dr. Chinwe A. Ejikeme" }
            ],
            message: "",
            success: false,
            error: false,
        }),
        methods: {
            deleteMember(id) {
                alert("deleted: " + id);
                this.error = true;
                this.success = false;
            },
        },
    }
</script>