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
                    <v-text-field v-model="webMasterEmail" :rules="emailRules" :counter="50" label="Webmaster Email" required></v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                    <v-text-field v-model="webMasterPassword" :rules="webMasterPasswordRules" :counter="50" label="Webmaster Password" required></v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                    <v-text-field v-model="serverEmailUserName" :rules="serverEmailUserNameRules" :counter="50" label="Server Email UserName" required></v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                    <v-text-field v-model="serverEmailPassword" :rules="serverEmailPasswordRules" :counter="50" label="Server Email Password" required></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="3">
                    <v-text-field v-model="serverEmailHost" :rules="serverEmailHostRules" :counter="50" label="Server Email Host" required></v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                    <v-text-field v-model="serverEmailPort" :rules="serverEmailPortRules" :counter="50" label="Server Email Port" required></v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                    <v-select v-model="serverEmailEnableSSL" :items="enableSSL" :rules="enableSSLRules" label="Server Email Enable SSL" required></v-select>
                </v-col>
                <v-col cols="12" md="3">
                    <v-text-field v-model="serverDefaultContactEmail" :rules="serverDefaultContactEmailRules" :counter="50" label="Server Default Contact Email" required></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="3">
                    <v-text-field v-model="serverSendgridApiKey" :rules="sendgridApiKeyRules" :counter="50" label="Server Sendgrid Api Key" required></v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                    <v-text-field v-model="defaultRegistrationPassword" :rules="defaultRegistrationPasswordRules" :counter="50" label="Default Registration Password" required></v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                    <v-text-field v-model="defaultEmailUserName" :rules="defaultEmailUserNameRules" :counter="50" label="Default Email User Name" required></v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                    <v-text-field v-model="defaultEmailPassword" :rules="defaultEmailPasswordRules" :counter="50" label="Default Email Password" required></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="3">
                    <v-text-field v-model="defaultEmailHost" :rules="defaultEmailHostRules" :counter="50" label="Default Email Host" required></v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                    <v-text-field v-model="defaultEmailPort" :rules="defaultEmailPortRules" :counter="50" label="Default Email Port" required></v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                    <v-select v-model="defaultEmailEnableSSL" :items="enableSSL" :rules="enableSSLRules" label="Default Email Enable SSL" required></v-select>
                </v-col>
                <v-col cols="12" md="3">
                    <v-text-field v-model="defaultSendgridApiKey" :rules="sendgridApiKeyRules" :counter="50" label="Default Sendgrid Api Key" required></v-text-field>
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
            id: 0,
            webMasterEmail: "",
            webMasterPassword: "",
            serverEmailUserName: "",
            serverEmailPassword: "",
            serverEmailHost: "",
            serverEmailPort: "",
            serverEmailEnableSSL: "",
            enableSSL: ["True", "False"],
            serverDefaultContactEmail: "",
            serverSendgridApiKey: "",
            defaultRegistrationPassword: "",
            defaultEmailUserName: "",
            defaultEmailPassword: "",
            defaultEmailHost: "",
            defaultEmailPort: "",
            defaultEmailEnableSSL: "",
            defaultSendgridApiKey: "",
            message: "",
            success: false,
            error: false,
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+/.test(v) || 'E-mail must be valid',
                v => v.length <= 50 || 'E-mail must not be greater than 50 characters'
            ],
            webMasterPasswordRules: [
                v => !!v || 'Webmaster Password is required',
                v => v.length <= 50 || 'Webmaster Password must not be greater than 50 characters',
            ],
            serverEmailUserNameRules: [
                v => !!v || 'Server Email UserName is required',
                v => v.length <= 50 || 'Server Email UserName must not be greater than 50 characters',
            ],
            serverEmailPasswordRules: [
                v => !!v || 'Server Email Password is required',
                v => v.length <= 50 || 'Server Email Password must not be greater than 50 characters',
            ],
            serverEmailHostRules: [
                v => !!v || 'Server Email Host is required',
                v => v.length <= 50 || 'Server Email Host must not be greater than 50 characters',
            ],
            serverEmailPortRules: [
                v => !!v || 'Server Email Port is required',
                v => v.length <= 50 || 'Server Email Port must not be greater than 50 characters',
            ],
            enableSSLRules: [
                v => !!v || 'Enable SSL is required'
            ],
            serverDefaultContactEmailRules: [
                v => !!v || 'Server Default Contact Email is required',
                v => /.+@.+/.test(v) || 'Server Default Contact Email must be valid',
                v => v.length <= 50 || 'Server Default Contact Email must not be greater than 50 characters'
            ],
            sendgridApiKeyRules: [
                v => !!v || 'Server Sendgrid Api Key is required',
                v => v.length <= 50 || 'Server Sendgrid Api Key must not be greater than 50 characters',
            ],
            defaultRegistrationPasswordRules: [
                v => !!v || 'Default Registration Password is required',
                v => v.length <= 50 || 'Default Registration Password must not be greater than 50 characters',
            ],
            defaultEmailUserNameRules: [
                v => !!v || 'Default Email User Name is required',
                v => v.length <= 50 || 'Default Email User Name must not be greater than 50 characters',
            ],
            defaultEmailPasswordRules: [
                v => !!v || 'Default Email Password is required',
                v => v.length <= 50 || 'Default Email Password must not be greater than 50 characters',
            ],
            defaultEmailHostRules: [
                v => !!v || 'Default Email Host is required',
                v => v.length <= 50 || 'Default Email Host must not be greater than 50 characters',
            ],
            defaultEmailPortRules: [
                v => !!v || 'Default Email Port is required',
                v => v.length <= 50 || 'Default Email Port must not be greater than 50 characters',
            ]
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