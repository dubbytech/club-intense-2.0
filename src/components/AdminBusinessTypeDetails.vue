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
            <v-row justify="space-between">
                <v-col cols="12" md="5">
                    <div>Available Business Types</div>
                    <v-row dense v-for="businessType in businessTypes" :key="businessType.id">
                        <v-col cols="12" md="8">
                            <v-card class="pa-2" outlined tile>{{businessType.Category}}</v-card>
                        </v-col>
                        <v-col cols="6" md="4">
                            <v-btn class="ma-2" tile outlined color="error" @click="deleteBusinessType(businessType.id)"><v-icon left>mdi-trash-can</v-icon> Delete </v-btn>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col cols="12" md="5">
                    <div>Create BusinessType</div>
                    <v-row>
                        <v-col class="d-flex" cols="12">
                            <v-text-field v-model="businessTypeName" :rules="businessTypeRules" :counter="50" label="New Business Type" required></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="4">
                            <v-btn :disabled="!valid" color="success" class="mr-4" @click="createBusinessType">Create Business Type</v-btn>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-container>
    </v-form>
</template>
<script>
    export default {
        data: () => ({
            valid: false,
            inset: false,
            businessTypeName: "",
            businessTypes: [
                { id: 1, Category: "Personal Care & Services" },
                { id: 2, Category: "Education" },
                { id: 3, Category: "Manufacturing" }
            ],
            businessTypeRules: [
                v => !!v || 'BusinessType is required',
                v => v.length <= 100 || 'Category must not be more than 100 characters',
            ],
            selectedBusinessTypeId: "",
            createdBy: 0,
            createdTs: null,
            changedBy: 0,
            changedTs: null,
            message: "",
            success: false,
            error: false,

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
            createBusinessType() {
                alert("added: " + this.businessTypeName);
                this.error = false;
                this.success = true;
                this.valid = false;
            },
            deleteBusinessType(id) {
                alert("delete businessType: " + id);
                this.success = false;
                this.error = true;
                this.valid = false
            }
        },
    }
</script>