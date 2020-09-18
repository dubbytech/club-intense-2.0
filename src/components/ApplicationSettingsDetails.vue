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
                <v-col cols="12" md="3">
                    <v-text-field v-model="WebMasterEmail" :rules="emailRules" :counter="50" label="Webmaster Email" required></v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                    <v-text-field v-model="WebMasterPassword" :rules="WebMasterPasswordRules" :counter="50" label="Webmaster Password" required></v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                    <v-text-field v-model="ServerEmailUserName" :rules="ServerEmailUserNameRules" :counter="50" label="Server Email UserName" required></v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                    <v-text-field v-model="ServerEmailPassword" :rules="ServerEmailPasswordRules" :counter="50" label="Server Email Password" required></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="3">
                    <v-text-field v-model="ServerEmailHost" :rules="ServerEmailHostRules" :counter="50" label="Server Email Host" required></v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                    <v-text-field v-model="ServerEmailPort" :rules="ServerEmailPortRules" :counter="50" label="Server Email Port" required></v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                    <v-select :items="EnableSSL" :rules="EnableSSLRules" label="Server Email Enable SSL" required></v-select>
                </v-col>
                <v-col cols="12" md="3">
                    <v-text-field v-model="ServerDefaultContactEmail" :rules="ServerDefaultContactEmailRules" :counter="50" label="Server Default Contact Email" required></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="3">
                    <v-text-field v-model="ServerSendgridApiKey" :rules="SendgridApiKeyRules" :counter="50" label="Server Sendgrid Api Key" required></v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                    <v-text-field v-model="DefaultRegistrationPassword" :rules="DefaultRegistrationPasswordRules" :counter="50" label="Default Registration Password" required></v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                    <v-text-field v-model="DefaultEmailUserName" :rules="DefaultEmailUserNameRules" :counter="50" label="Default Email User Name" required></v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                    <v-text-field v-model="DefaultEmailPassword" :rules="DefaultEmailPasswordRules" :counter="50" label="Default Email Password" required></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="3">
                    <v-text-field v-model="DefaultEmailHost" :rules="DefaultEmailHostRules" :counter="50" label="Default Email Host" required></v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                    <v-text-field v-model="DefaultEmailPort" :rules="DefaultEmailPortRules" :counter="50" label="Default Email Port" required></v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                    <v-select :items="EnableSSL" :rules="EnableSSLRules" label="Default Email Enable SSL" required></v-select>
                </v-col>
                <v-col cols="12" md="3">
                    <v-text-field v-model="DefaultSendgridApiKey" :rules="SendgridApiKeyRules" :counter="50" label="Default Sendgrid Api Key" required></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="4">
                    <v-btn :disabled="!valid" color="success" class="mr-4" @click="submitAppSettings">Submit</v-btn>
                    <v-btn color="error" class="mr-4" @click="deleteAppSettings"><v-icon left>mdi-trash-can</v-icon> Delete </v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-form>
</template>

<script>
    export default {
        data: () => ({
            valid: false,
            siteId: 0,
            name: "",
            email: "",
            address1: "",
            address2: "",
            city: "",
            state: "",
            zipCode: "",
            EnableSSL: ["True", "False"],
            phone: "",
            fax: "",
            imageId: "",
            createdBy: 0,
            createdTs: null,
            changedBy: 0,
            changedTs: null,
            message: "",
            success: false,
            error: false,
            nameRules: [
                v => !!v || 'Name is required',
                v => v.length <= 50 || 'Name must not be greater than 50 characters',
            ],
            address1Rules: [
                v => !!v || 'Address1 is required',
                v => v.length <= 50 || 'Name must not be greater than 50 characters',
            ],
            address2Rules: [
                v => v.length <= 50 || 'Address2 must not be greater than 50 characters',
            ],
            phoneRules: [
                v => !!v || 'Phone is required',
                v => v.length <= 10 || 'Name must not be greater than 10 characters',
            ],
            faxRules: [
                v => v.length <= 10 || 'Name must not be greater than 10 characters',
            ],
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+/.test(v) || 'E-mail must be valid',
                v => v.length <= 50 || 'E-mail must not be greater than 50 characters'
            ],
            siteRules: [
                v => !!v || 'Site type is required',
            ],
            zipCodeRules: [
                v => !!v || 'Zip code is required',
                v => v.length <= 5 || 'Zip code must not be greater than 5 characters',
            ],
            cityRules: [
                v => !!v || 'City is required',
                v => v.length <= 50 || 'City must not be greater than 50 characters',
            ],
        }),
        methods: {
            validate() {
                this.$refs.form.validate();
            },
            reset() {
                this.$refs.form.reset();
                this.valid = false;
            },
            resetValidation() {
                this.$refs.form.resetValidation()
            },
            submitAppSettings() {
                alert("submit");
                this.success = true;
                this.error = false;
            },
            deleteAppSettings() {
                alert("delete");
                this.error = true;
                this.success = false;
            }
        },
    }
</script>