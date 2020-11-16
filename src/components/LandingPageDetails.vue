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
                        Error updating record:<br />
                        <span>{{message}}</span>
                    </v-alert>
                </v-col>
            </v-row>
            <v-row v-if="landingPages.length==0">
                <v-col cols="12">
                    <v-alert dense type="error">
                        No landing page found.
                    </v-alert>
                </v-col>
            </v-row>
            <v-row v-else>
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
    //import Table from '@ckeditor/ckeditor5-table/src/table';
    //import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar';
    //import TableProperties from '@ckeditor/ckeditor5-table/src/tableproperties';
    //import TableCellProperties from '@ckeditor/ckeditor5-table/src/tablecellproperties';
    //import EssentialsPlugin from '@ckeditor/ckeditor5-essentials/src/essentials';
    //import BoldPlugin from '@ckeditor/ckeditor5-basic-styles/src/bold';
    //import ItalicPlugin from '@ckeditor/ckeditor5-basic-styles/src/italic';
    //import LinkPlugin from '@ckeditor/ckeditor5-link/src/link';
    //import ParagraphPlugin from '@ckeditor/ckeditor5-paragraph/src/paragraph';

    import { HTTP } from "../http-common.js";

    export default {
        data: () => ({
            valid: false,
            editor: ClassicEditor,
            editorConfig: {
                // The configuration of the rich-text editor.
                toolbar: ['heading', 'bold', 'italic', 'imageUpload', 'link', 'bulletedList', 'numberedList', 'indent', 'outdent', 'insertTable', 'alignment', 'fontSize', 'fontColor', 'mediaEmbed', 'highlight', 'blockQuote', 'undo', 'redo'],
                image: {
                    toolbar: ['imageTextAlternative', '|', 'imageStyle:alignLeft', 'imageStyle:full', 'imageStyle:alignCenter', 'imageStyle:alignRight', 'imageStyle:side'],
                    styles: ['full', 'alignLeft', 'alignCenter', 'alignRight', 'side']
                },
                heading: {
                    options: [
                        { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
                        { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
                        { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
                        { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
                        { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
                        { model: 'heading5', view: 'h5', title: 'Heading 5', class: 'ck-heading_heading5' },
                        { model: 'heading6', view: 'h6', title: 'Heading 6', class: 'ck-heading_heading6' },
                    ],
                },
                mediaEmbed: {
                    previewsInData: true,
                },
                //simpleUpload: {
                //    uploadUrl: '/shopadmin/files',
                //    headers: {
                //        'X-CSRF-TOKEN': window.Laravel.csrfToken,
                //    },
                //},
                link: {
                    addTargetToExternalLinks: true,
                },
            },
            landingPages: [],
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
                this.landingPages = data;
            },
            emptyEditor(landingPage) {
                landingPage.pageContent = "";
            },
            submitEditor(landingPage) {
                HTTP.post('/api/landingPage/', {
                    id: landingPage.id,
                    title: landingPage.title,
                    pageContent: landingPage.pageContent,
                    isActive: landingPage.isActive
                })
                    .then(response => this.responseMessage(response))
                    .catch(response => this.responseMessage(response))
            },
            responseMessage(response) {
                this.message = response.data.results.message;
                this.success = response.data.results.success;
                this.error = !this.success;
                if (this.success) this.getLandingPages();
            },
            getFailed() {

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