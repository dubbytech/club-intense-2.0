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
                            <v-tab>Home</v-tab>
                            <v-tab>About</v-tab>
                            <v-tab>Gallery</v-tab>
                            <v-tab>Publication</v-tab>
                            <v-tab>Member Only</v-tab>
                            <v-tab>Admin</v-tab>
                            <v-tab>Contact</v-tab>

                            <v-tab-item>
                                <v-card flat>
                                    <v-card-text>
                                        <ckeditor :editor="editor" v-model="editorDataHome" :config="editorConfig"></ckeditor>
                                        <v-row>
                                            <v-col cols="12" md="6">
                                                <v-btn :disabled="!valid" color="success" class="mr-4" @click="submitEditor('Home')">Submit</v-btn>
                                                <v-btn :disabled="!valid" color="error" class="mr-4" @click="emptyEditor('Home')">Reset</v-btn>
                                            </v-col>
                                        </v-row>
                                    </v-card-text>
                                </v-card>
                            </v-tab-item>
                            <v-tab-item>
                                <v-card flat>
                                    <v-card-text>
                                        <ckeditor :editor="editor" v-model="editorDataAbout" :config="editorConfig"></ckeditor>
                                        <v-row>
                                            <v-col cols="12" md="6">
                                                <v-btn :disabled="!valid" color="success" class="mr-4" @click="submitEditor('About')">Submit</v-btn>
                                                <v-btn :disabled="!valid" color="error" class="mr-4" @click="emptyEditor('About')">Reset</v-btn>
                                            </v-col>
                                        </v-row>
                                    </v-card-text>
                                </v-card>
                            </v-tab-item>
                            <v-tab-item>
                                <v-card flat>
                                    <v-card-text>
                                        <ckeditor :editor="editor" v-model="editorDataGallery" :config="editorConfig"></ckeditor>
                                        <v-row>
                                            <v-col cols="12" md="6">
                                                <v-btn :disabled="!valid" color="success" class="mr-4" @click="submitEditor('Gallery')">Submit</v-btn>
                                                <v-btn :disabled="!valid" color="error" class="mr-4" @click="emptyEditor('Gallery')">Reset</v-btn>
                                            </v-col>
                                        </v-row>
                                    </v-card-text>
                                </v-card>
                            </v-tab-item>
                            <v-tab-item>
                                <v-card flat>
                                    <v-card-text>
                                        <ckeditor :editor="editor" v-model="editorDataPublication" :config="editorConfig"></ckeditor>
                                        <v-row>
                                            <v-col cols="12" md="6">
                                                <v-btn :disabled="!valid" color="success" class="mr-4" @click="submitEditor('Publication')">Submit</v-btn>
                                                <v-btn :disabled="!valid" color="error" class="mr-4" @click="emptyEditor('Publication')">Reset</v-btn>
                                            </v-col>
                                        </v-row>
                                    </v-card-text>
                                </v-card>
                            </v-tab-item>
                            <v-tab-item>
                                <v-card flat>
                                    <v-card-text>
                                        <ckeditor :editor="editor" v-model="editorDataMember" :config="editorConfig"></ckeditor>
                                        <v-row>
                                            <v-col cols="12" md="6">
                                                <v-btn :disabled="!valid" color="success" class="mr-4" @click="submitEditor('Member')">Submit</v-btn>
                                                <v-btn :disabled="!valid" color="error" class="mr-4" @click="emptyEditor('Member')">Reset</v-btn>
                                            </v-col>
                                        </v-row>
                                    </v-card-text>
                                </v-card>
                            </v-tab-item>
                            <v-tab-item>
                                <v-card flat>
                                    <v-card-text>
                                        <ckeditor :editor="editor" v-model="editorDataAdmin" :config="editorConfig"></ckeditor>
                                        <v-row>
                                            <v-col cols="12" md="6">
                                                <v-btn :disabled="!valid" color="success" class="mr-4" @click="submitEditor('Admin')">Submit</v-btn>
                                                <v-btn :disabled="!valid" color="error" class="mr-4" @click="emptyEditor('Admin')">Reset</v-btn>
                                            </v-col>
                                        </v-row>
                                    </v-card-text>
                                </v-card>
                            </v-tab-item>
                            <v-tab-item>
                                <v-card flat>
                                    <v-card-text>
                                        <ckeditor :editor="editor" v-model="editorDataContact" :config="editorConfig"></ckeditor>
                                        <v-row>
                                            <v-col cols="12" md="6">
                                                <v-btn :disabled="!valid" color="success" class="mr-4" @click="submitEditor('Contact')">Submit</v-btn>
                                                <v-btn :disabled="!valid" color="error" class="mr-4" @click="emptyEditor('Contact')">Reset</v-btn>
                                            </v-col>
                                        </v-row>
                                    </v-card-text>
                                </v-card>
                            </v-tab-item>
                        </v-tabs>
                    </v-card>
                </template>
            </v-row>
        </v-container>
    </v-form>
</template>

<script>
    import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

    export default {
        data: () => {
            return {
                valid: false,
                editor: ClassicEditor,
                editorDataHome: '',
                editorDataAbout: '',
                editorDataGallery: '',
                editorDataPublication: '',
                editorDataMember: '',
                editorDataAdmin: '',
                editorDataContact: '',
                editorConfig: {
                    // The configuration of the rich-text editor.
                },
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
            };
        },
        methods: {
            emptyEditor(view) {
                switch (view) {
                    case 'Home':
                        this.editorDataHome = "";
                        break;
                    case 'About':
                        this.editorDataAbout = "";
                        break;
                    case 'Gallery':
                        this.editorDataGallery = "";
                        break;
                    case 'Publication':
                        this.editorDataPublication = "";
                        break;
                    case 'Member':
                        this.editorDataMember = "";
                        break;
                    case 'Admin':
                        this.editorDataAdmin = "";
                        break;
                    case 'Contact':
                        this.editorDataContact = "";
                        break;
                    default:
                    // code block
                }
            },
            submitEditor(view) {
                switch (view) {
                    case 'Home':
                        // code block
                        break;
                    case 'About':
                        // code block
                        break;
                    case 'Gallery':
                        // code block
                        break;
                    default:
                    // code block
                }
                alert("editorData" + view);
            }
        },
    }
</script>
<style scoped>
</style>