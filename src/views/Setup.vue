<template>
    <v-card>
        <v-card-title class="text-center justify-center py-6">
            <h1 class="font-weight-bold display-3 basil--text">Site setup</h1>
        </v-card-title>
        <div class="home">
            <site-setup-details />
        </div>
        <v-tabs v-model="tab" background-color="primary" center-active dark show-arrows>
            <v-tab>Club info</v-tab>
            <v-tab>Application settings</v-tab>
            <v-tab>Landing Pages</v-tab>
            <v-tab>Manage Admins</v-tab>
            <v-tab>Manage Payment For</v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
            <v-tab-item>
                <v-card flat>
                    <v-card-text>
                        <club-info-details></club-info-details>
                    </v-card-text>
                </v-card>
            </v-tab-item>
            <v-tab-item>
                <v-card flat>
                    <v-card-text>
                        <application-settings-details></application-settings-details>
                    </v-card-text>
                </v-card>
            </v-tab-item>
            <v-tab-item>
                <v-card flat>
                    <v-card-text>
                        <landing-page-details></landing-page-details>
                    </v-card-text>
                </v-card>
            </v-tab-item>
            <v-tab-item>
                <v-card flat>
                    <v-card-text>
                        <admin-details></admin-details>
                    </v-card-text>
                </v-card>
            </v-tab-item>
            <v-tab-item>
                <v-card flat>
                    <v-card-text>
                        <payment-for-details></payment-for-details>
                    </v-card-text>
                </v-card>
            </v-tab-item>
        </v-tabs-items>
    </v-card>
</template>

<script>
    import SiteSetupDetails from "@/components/SiteSetupDetails";

    import ClubInfoDetails from "@/components/ClubInfoDetails";
    import ApplicationSettingsDetails from "@/components/ApplicationSettingsDetails";
    import LandingPageDetails from "@/components/LandingPageDetails";
    import AdminDetails from "@/components/AdminDetails";
    import PaymentForDetails from "@/components/PaymentForDetails";

    export default {
        components: {
            SiteSetupDetails,
            ClubInfoDetails,
            ApplicationSettingsDetails,
            LandingPageDetails,
            AdminDetails,
            PaymentForDetails
        },
        data() {
            return {
                tab: null
            }
        },
    }
</script>