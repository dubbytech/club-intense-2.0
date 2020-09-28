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
            <v-row>
                <template>
                    <v-card>
                        <v-toolbar flat color="primary" dark>
                            <v-toolbar-title>Navigation Landing Pages Verbiage</v-toolbar-title>
                        </v-toolbar>
                        <v-tabs v-model="tab" background-color="teal"
                                class="elevation-2"
                                dark
                                :centered="centered"
                                :grow="grow"
                                :vertical="vertical"
                                :right="right"
                                :prev-icon="prevIcon ? 'mdi-arrow-left-bold-box-outline' : undefined"
                                :next-icon="nextIcon ? 'mdi-arrow-right-bold-box-outline' : undefined"
                                :icons-and-text="icons">
                            <v-tabs-slider></v-tabs-slider>
                            <v-tab v-for="i in landingPages" :key="i.id">{{i.title}}</v-tab>
                        </v-tabs>
                        <v-tabs-items v-model="tab">
                            <v-tab-item v-for="i in landingPages" :key="i.id">
                                <v-card flat>
                                    <v-card-text>
                                        <ckeditor :editor="editor" v-model="i.pageContent" :config="editorConfig"></ckeditor>
                                        <v-row>
                                            <v-col cols="12" md="6">
                                                <v-btn :disabled="!valid" color="success" class="mr-4" @click="submitEditor(i)">Submit</v-btn>
                                                <v-btn :disabled="!valid" color="error" class="mr-4" @click="emptyEditor(i)">Reset</v-btn>
                                            </v-col>
                                        </v-row>
                                    </v-card-text>
                                </v-card>
                            </v-tab-item>
                        </v-tabs-items>
                    </v-card>
                </template>
            </v-row>
        </v-container>
    </v-form>
</template>

<script>
    import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
    import { HTTP } from "../http-common.js";

    export default {
        data: () => ({
            valid: false,
            editor: ClassicEditor,
            editorConfig: {
                // The configuration of the rich-text editor.
            },
            landingPages: [
                //{ id: 1, title: "Home", pageContent: "<p>Home landing page</p>", isActive: true },
                //{ id: 2, title: "About", pageContent: "<p>About landing page</p>", isActive: true },
                //{ id: 3, title: "Gallery", pageContent: "<p>Gallery landing page</p>", isActive: true },
                //{ id: 4, title: "Publication", pageContent: "<p>Publication landing page</p>", isActive: true },
                //{ id: 5, title: "Member", pageContent: "<p>Member landing page</p>", isActive: true },
                //{ id: 6, title: "Admin", pageContent: "<p>Admin landing page</p>", isActive: true },
                //{ id: 7, title: "Contact", pageContent: "<p>Contact landing page</p>", isActive: true },
                //{ id: 8, title: "Site Setup", pageContent: "<p>Site Setup landing page</p>", isActive: true }
            ],
            tab: null,
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            icons: false,
            centered: false,
            grow: true,
            vertical: false,
            prevIcon: false,
            nextIcon: false,
            right: false,
            tabs: 3,
            message: "",
            success: false,
            error: false,
        }),
        created() {
            this.getLandingPages();
        },
        methods: {
            getLandingPages() {
                HTTP.get('/api/landingPage/')
                    .then(response => this.populateLandingPages(response.data.results.data))
                    .catch(() => this.getFailed())
            },
            populateLandingPages(data) {
                console.log(data);
                this.landingPages = data;
            },
            emptyEditor(landingPage) {
                landingPage.pageContent = "";
            },
            submitEditor(landingPage) {
                alert(landingPage.pageContent);
                HTTP.post('/api/landingPage/', {
                    id: landingPage.id,
                    title: landingPage.title,
                    pageContent: landingPage.pageContent,
                    isActive:landingPage.isActive
                })
                    .then(() => this.saveSuccessful())
                    .catch(() => this.saveFailed())
            },
            saveSuccessful() {
                this.success = true;
                this.error = false;
            },
            saveFailed() {
                this.success = false;
                this.error = true;
            }
        },
    }

</script>
<style scoped>
</style>