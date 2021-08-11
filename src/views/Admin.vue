<template>
    <v-card>
        <v-card-title class="text-center justify-center py-6">
            <h1 class="font-weight-bold display-3 basil--text">Admin Only</h1>
        </v-card-title>
        <div class="home">
            <admin-landing-page-details />
        </div>
        <v-tabs v-model="tab" background-color="primary" center-active dark show-arrows>
            <v-tab>Register member</v-tab>
            <v-tab>Manage roles</v-tab>
            <v-tab>Manage payments</v-tab>
            <v-tab>Manage committees</v-tab>
            <v-tab>Manage Hometowns</v-tab>
            <v-tab>Manage Business types</v-tab>
            <v-tab>Manage memberships</v-tab>
            <v-tab>Site Setup</v-tab>
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
                        <admin-committee-details></admin-committee-details>
                    </v-card-text>
                </v-card>
            </v-tab-item>
            <v-tab-item>
                <v-card flat>
                    <v-card-text>
                        <admin-hometown-details></admin-hometown-details>
                    </v-card-text>
                </v-card>
            </v-tab-item>
            <v-tab-item>
                <v-card flat>
                    <v-card-text>
                        <admin-business-type-details></admin-business-type-details>
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
            <v-tab-item>
                <v-card flat>
                    <v-card-text>
                        <site-setup v-bind:isAdmin="true"></site-setup>
                    </v-card-text>
                </v-card>
            </v-tab-item>
        </v-tabs-items>
    </v-card>
</template>

<script>
    import AdminLandingPageDetails from "@/components/AdminLandingPageDetails";

    import AdminRegisterDetails from "@/components/AdminRegisterDetails";
    import AdminRoleDetails from "@/components/AdminRoleDetails";
    import AdminPaymentDetails from "@/components/AdminPaymentDetails";
    import AdminCommitteeDetails from "@/components/AdminCommitteeDetails";
    import AdminHometownDetails from "@/components/AdminHometownDetails";
    import AdminBusinessTypeDetails from "@/components/AdminBusinessTypeDetails";
    import DirectoryDetails from "@/components/DirectoryDetails";
    import SiteSetup from "@/views/Setup";

    export default {
        components: {
            AdminLandingPageDetails,
            AdminRegisterDetails,
            AdminRoleDetails,
            AdminPaymentDetails,
            AdminCommitteeDetails,
            AdminHometownDetails,
            AdminBusinessTypeDetails,
            DirectoryDetails,
            SiteSetup
        },
        data() {
            return {
                tab: null

            }
        },
    }
</script>