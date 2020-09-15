<template>
    <v-form ref="form" v-model="valid" lazy-validation>
        <v-container class="grey lighten-5">
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
                <v-col cols="12" md="2">
                    Home town:
                    <v-card class="pa-2" outlined tile>{{member.homeTownId}}</v-card>
                </v-col>
                <v-col cols="12" md="2">
                    Cell phone:
                    <v-card class="pa-2" outlined tile>{{member.cellPhone}}</v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-form>
</template>

<script>
    export default {
        data: () => ({
            valid: false,
            members: [
                { id: 1, firstName: "Stanley", mi: "S", lastName: "Ejikeme", titleDegree: "Mr.", email: "vastgroupusa@gmail.com", homeTownId: 1, cellPhone: "404-917-3801" },
                { id: 2, firstName: "Chinwe", mi: "S", lastName: "Ejikeme", titleDegree: "Mrs.", email: "chyccidili@gmail.com", homeTownId: 2, cellPhone: "404-917-6322" }
            ],
            message: "",
        }),
        methods: {

        },
    }
</script>