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
                        <template>
                            <div>Profile</div>
                        </template>
                    </v-card-text>
                </v-card>
            </v-tab-item>
            <v-tab-item>
                <v-card flat>
                    <v-card-text>
                        <template>
                            <div>Spouse</div>
                        </template>
                    </v-card-text>
                </v-card>
            </v-tab-item>
            <v-tab-item>
                <v-card flat>
                    <v-card-text>
                        <template>
                            <div>Child</div>
                        </template>
                    </v-card-text>
                </v-card>
            </v-tab-item>
            <v-tab-item>
                <v-card flat>
                    <v-card-text>
                        <template>
                            <div>Business</div>
                        </template>
                    </v-card-text>
                </v-card>
            </v-tab-item>
            <v-tab-item>
                <v-card flat>
                    <v-card-text>
                        <template>
                            <div>Committee</div>
                        </template>
                    </v-card-text>
                </v-card>
            </v-tab-item>
            <v-tab-item>
                <v-card flat>
                    <v-card-text>
                        <template>
                            <div>Financial</div>
                        </template>
                    </v-card-text>
                </v-card>
            </v-tab-item>
            <v-tab-item>
                <v-card flat>
                    <v-card-text>
                        <template>
                            <div>Directory</div>
                        </template>
                    </v-card-text>
                </v-card>
            </v-tab-item>
        </v-tabs-items>
    </v-card>
</template>

<script>
    export default {
        data() {
            return {
                tab: null,
                items: [
                    { tab: 'One', content: 'Tab 1 Content' },
                    { tab: 'Two', content: 'Tab 2 Content' },
                    { tab: 'Three', content: 'Tab 3 Content' },
                    { tab: 'Four', content: 'Tab 4 Content' },
                    { tab: 'Five', content: 'Tab 5 Content' },
                    { tab: 'Six', content: 'Tab 6 Content' },
                    { tab: 'Seven', content: 'Tab 7 Content' },
                    { tab: 'Eight', content: 'Tab 8 Content' },
                    { tab: 'Nine', content: 'Tab 9 Content' },
                    { tab: 'Ten', content: 'Tab 10 Content' },
                ],
            }
        },
    }
</script>