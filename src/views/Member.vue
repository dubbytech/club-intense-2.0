<template>
    <v-card>
        <v-card-title class="text-center justify-center py-6">
            <h1 class="font-weight-bold display-3 basil--text">Member Only</h1>
        </v-card-title>
        <v-tabs v-model="tab" background-color="primary" center-active dark show-arrows>
            <v-tab>Profile</v-tab>
            <v-tab>Spouse</v-tab>
            <v-tab>Child</v-tab>
            <v-tab>Business</v-tab>
            <v-tab>Committee</v-tab>
            <v-tab>Financial</v-tab>
            <v-tab>Directory</v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
            <v-tab-item>
                <v-card flat>
                    <v-card-text>
                        <profile-details></profile-details>
                    </v-card-text>
                </v-card>
            </v-tab-item>
            <v-tab-item>
                <v-card flat>
                    <v-card-text>
                        <spouse-details></spouse-details>
                    </v-card-text>
                </v-card>
            </v-tab-item>
            <v-tab-item>
                <v-card flat>
                    <v-card-text>
                        <child-details></child-details>
                    </v-card-text>
                </v-card>
            </v-tab-item>
            <v-tab-item>
                <v-card flat>
                    <v-card-text>
                        <business-details></business-details>
                    </v-card-text>
                </v-card>
            </v-tab-item>
            <v-tab-item>
                <v-card flat>
                    <v-card-text>
                        <committee-details></committee-details>
                    </v-card-text>
                </v-card>
            </v-tab-item>
            <v-tab-item>
                <v-card flat>
                    <v-card-text>
                        <financial-details></financial-details>
                    </v-card-text>
                </v-card>
            </v-tab-item>
            <v-tab-item>
                <v-card flat>
                    <v-card-text>
                        <directory-details></directory-details>
                    </v-card-text>
                </v-card>
            </v-tab-item>
        </v-tabs-items>
    </v-card>
</template>

<script>
    import ProfileDetails from "@/components/MemberProfileDetails";
    import SpouseDetails from "@/components/MemberSpouseDetails";
    import ChildDetails from "@/components/MemberChildDetails";
    import BusinessDetails from "@/components/MemberBusinessDetails";
    import CommitteeDetails from "@/components/MemberCommitteeDetails";
    import FinancialDetails from "@/components/MemberFinancialDetails";
    import DirectoryDetails from "@/components/MemberDirectoryDetails";

    export default {
        components: {
            ProfileDetails,
            SpouseDetails,
            ChildDetails,
            BusinessDetails,
            CommitteeDetails,
            FinancialDetails,
            DirectoryDetails
        },
        data() {
            return {
                tab: null

            }
        },
    }
</script>