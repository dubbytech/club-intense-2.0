<template>
    <v-form ref="form" v-model="valid" lazy-validation>
        <v-container>
            <v-row>
                <div v-html="landingPageInfo"></div>
            </v-row>
        </v-container>
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
                <v-col cols="12">
                    <v-text-field v-model="name" :rules="nameRules" label="Name" required></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <v-text-field v-model="subject" :rules="subjectRules" label="Subject" required></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <v-textarea clearable row-height="10" :rules="messageRules" name="message" filled label="Message" auto-grow v-model="message"></v-textarea>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <v-btn :disabled="!valid" color="success" class="mr-4" @click="sendEmail">Submit</v-btn>
                    <v-btn color="error" class="mr-4" @click="reset">Reset Form</v-btn>
                </v-col>
            </v-row>
        </v-container>
        <!--<v-btn color="warning" @click="resetValidation">Reset Validation</v-btn>-->
    </v-form>
</template>

<script>
import { HTTP } from "../http-common.js";

export default {
    data: () => ({
        valid: true,
        landingPageInfo: "",
        name: "",
        nameRules: [v => !!v || "Name is required"],
        email: "",
        emailRules: [
            v => !!v || "E-mail is required",
            v => /.+@.+\..+/.test(v) || "E-mail must be valid"
        ],
        select: null,
        items: ["Item 1", "Item 2", "Item 3", "Item 4"],
        itemRules: [v => !!v || "Item is required"],
        checkbox: false,
        checkBoxRules: [v => !!v || "You must agree to continue!"],
        subject: "",
        subjectRules: [v => !!v || "subject is required"],
        message: "",
        messageRules: [v => !!v || "message is required"],
        success: false,
        error: false
    }),
    created() {
        this.getLandingPageInfo();
    },
    mounted() { },
    methods: {
        getLandingPageInfo() {
            HTTP.get("/api/landingPage/6d7544a1-76b4-4cbe-f521-08daa290c0ac")
                .then(response => this.populateLandingPageInfo(response.data))
                .catch(() => this.getFailed());
        },
        populateLandingPageInfo(data) {
            //console.log(data);
            for (var i = 0; i < data.length; i++) {
                if (data[i].title == "Contact") {
                    this.landingPageInfo = data[i].pageContent;
                    break;
                }
            }
        },
        getFailed() {
            console.log("get failed");
        },
        sendEmail() {
            alert("send email ");
            this.success = true;
            this.error = false;
            this.valid = false;
        },
        reset() {
            this.$refs.form.reset();
            this.valid = false;
            this.success = false;
            this.error = false;
        },
        resetValidation() {
            this.$refs.form.resetValidation();
        }
    }
};
</script>
