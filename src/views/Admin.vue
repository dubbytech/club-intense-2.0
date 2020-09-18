<template>
    <v-card>
        <v-card-title class="text-center justify-center py-6">
            <h1 class="font-weight-bold display-3 basil--text">Admin Only</h1>
        </v-card-title>
        <v-tabs v-model="tab" background-color="primary" center-active dark show-arrows>
            <v-tab>Register member</v-tab>
            <v-tab>Manage roles</v-tab>
            <v-tab>Manage payments</v-tab>
            <v-tab>Manage committees</v-tab>
            <v-tab>Manage Hometowns</v-tab>
            <v-tab>Manage Business types</v-tab>
            <v-tab>Manage memberships</v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
            <v-tab-item>
                <v-card flat>
                    <v-card-text>
                        <admin-register-details></admin-register-details>
                    </v-card-text>
                </v-card>
            </v-tab-item>
            <v-tab-item>
                <v-card flat>
                    <v-card-text>
                        <admin-role-details></admin-role-details>
                    </v-card-text>
                </v-card>
            </v-tab-item>
            <v-tab-item>
                <v-card flat>
                    <v-card-text>
                        <admin-payment-details></admin-payment-details>
                    </v-card-text>
                </v-card>
            </v-tab-item>
            <v-tab-item>
                <v-card flat>
                    <v-card-text>
                        manage committees
                    </v-card-text>
                </v-card>
            </v-tab-item>
            <v-tab-item>
                <v-card flat>
                    <v-card-text>
                        manage hometowns
                    </v-card-text>
                </v-card>
            </v-tab-item>
            <v-tab-item>
                <v-card flat>
                    <v-card-text>
                        manage business types
                    </v-card-text>
                </v-card>
            </v-tab-item>
            <v-tab-item>
                <v-card flat>
                    <v-card-text>
                        <directory-details v-bind:isAdmin="true"></directory-details>
                    </v-card-text>
                </v-card>
            </v-tab-item>
        </v-tabs-items>
    </v-card>
</template>

<script>
    import AdminRegisterDetails from "@/components/AdminRegisterDetails";
    import AdminRoleDetails from "@/components/AdminRoleDetails";
    import AdminPaymentDetails from "@/components/AdminPaymentDetails";
    import DirectoryDetails from "@/components/DirectoryDetails";

    export default {
        components: {
            AdminRegisterDetails,
            AdminRoleDetails,
            AdminPaymentDetails,
            DirectoryDetails
        },
        data() {
            return {
                tab: null

            }
        },
    }
</script>