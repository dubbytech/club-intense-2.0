<template>
    <div>
        <div v-if="progressInfos">
            <div class="mb-2" v-for="(progressInfo, index) in progressInfos" :key="index">
                <span>{{ progressInfo.fileName }}</span>
                <v-progress-linear v-model="progressInfo.percentage" color="light-blue" height="25" reactive><strong>{{ progressInfo.percentage }} %</strong></v-progress-linear>
            </div>
        </div>
        <v-row justify="space-between">
            <v-col cols="12" md="5">
                <form id="images">
                    <h3>Folder to Upload images</h3>
                    <v-row no-gutters justify="center" align="center">
                        <v-col cols="8">
                            <i aria-hidden="true" class=" v-icon notranslate material-icons theme--dark">folder_open</i>
                            <v-select v-model="selectedFolder" :items="fileInfos" label="Folder name" item-text="displayName" item-value="displayName" @change="onFolderChange" required></v-select>
                        </v-col>
                        <v-col cols="4" class="pl-2"></v-col>
                    </v-row>
                    <v-row no-gutters justify="center" align="center">
                        <v-col cols="8">
                            <v-file-input accept="image/*" multiple show-size label="Select Images" @change="selectFiles">
                            </v-file-input>
                        </v-col>
                        <v-col cols="4" class="pl-2">
                            <v-btn color="success" dark small @click="uploadFiles">
                                Upload
                                <v-icon right dark>mdi-cloud-upload</v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>
                </form>

                <v-alert v-if="message" border="left" color="teal" outlined class="multi-line">{{ message }}</v-alert>
                <v-card v-if="fileInfos.length > 0" class="mx-auto">
                    <v-list>
                        <v-subheader>List of Images Folders</v-subheader>
                        <v-list-item-group color="primary">
                            <v-list-item v-for="(file, index) in fileInfos" :key="index">
                                <v-list-item-content>
                                    <v-list-item-title class="mb-3">
                                        <v-icon color="success">mdi-camera-enhance</v-icon>
                                        <v-btn text rounded color="primary" dark small @click="getImages(file.id)">{{ file.displayName }}</v-btn>
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list-item-group>
                    </v-list>
                </v-card>
                <div>
                    <div v-for="(file, index) in folderImages" :key="index">
                        <a :href="file">{{ file }}</a>
                    </div>
                </div>
            </v-col>
            <v-col cols="12" md="5">
                <h3>Create New Image Folder</h3>
                <v-row>
                    <v-col class="d-flex" cols="12">
                        <v-text-field v-model="folderName" :counter="100" label="Enter folder name" required></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="4">
                        <v-btn color="success" class="mr-4" @click="createFolder">Create Image Folder</v-btn>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </div>
</template>
<script>
import UploadService from "@/services/UploadFileService";
import { HTTP } from "../http-common.js";

export default {
    name: "upload-image",
    data() {
        return {
            selectedFiles: undefined,
            progressInfos: [],
            message: "",
            fileInfos: [],
            imagePath: "/api/Gallery/",
            folderImages: [],
            selectedFolder: "",
            folders: [],
            folderName: ""
        };
    },
    mounted() {
        UploadService.getFiles(this.imagePath).then(response => {
            this.fileInfos = response.data.results.data;
            //console.log(this.fileInfos);
        });
    },
    methods: {
        selectFiles(files) {
            this.progressInfos = [];
            this.selectedFiles = files;
        },
        uploadFiles() {
            this.message = "";
            /*
                Initialize the form data
            */
            let formData = new FormData();

            /*
              Iterate over any file sent over appending the files
              to the form data.
            */
            for (var i = 0; i < this.selectedFiles.length; i++) {
                let file = this.selectedFiles[i];

                formData.append("files[" + i + "]", file);
            }
            formData.append("urlDisplayName", this.selectedFolder);

            /*
              Make the request to the POST /imagePath URL
            */
            HTTP.post(this.imagePath, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
                .then(function () {
                    console.log("SUCCESS!!");
                })
                .catch(function () {
                    console.log("FAILURE!!");
                });
        },
        upload(idx, file) {
            this.progressInfos[idx] = { percentage: 0, fileName: file.name };
            UploadService.upload(
                file,
                event => {
                    this.progressInfos[idx].percentage = Math.round(
                        (100 * event.loaded) / event.total
                    );
                },
                this.imagePath,
                this.selectedFolder //path to the folder
            )
                .then(response => {
                    let prevMessage = this.message ? this.message + "\n" : "";
                    this.message = prevMessage + response.data.message;
                    return UploadService.getFiles(this.imagePath);
                })
                .then(files => {
                    this.fileInfos = files.data;
                })
                .catch(() => {
                    this.progressInfos[idx].percentage = 0;
                    this.message = "Could not upload the file:" + file.name;
                });
        },
        getImages(id) {
            UploadService.getImages(this.imagePath, id)
                .then(response => {
                    this.folderImages = response.data.results.data;
                })
                .catch(() => {
                    this.message = "Could not load images for this event";
                });
        },
        getFolders(data) {
            this.folders = data;
        },
        onFolderChange() {
            // alert(this.selectedFolder);
        },
        createFolder() {
            UploadService.createFolder(this.folderName);
        }
    }
};
</script>
<style scoped>
</style>
