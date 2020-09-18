<template>
    <v-form ref="form" v-model="valid" lazy-validation>
        <v-container>
            <v-row justify="space-between">
                <v-col cols="12" md="5">
                    <div>Available Hometowns</div>
                    <v-row dense v-for="hometown in hometowns" :key="hometown.id">
                        <v-col cols="12" md="8">
                            <v-card class="pa-2" outlined tile>{{hometown.Name}}</v-card>
                        </v-col>
                        <v-col cols="6" md="4">
                            <v-btn class="ma-2" tile outlined color="error" @click="deleteHometown(hometown.id)"><v-icon left>mdi-trash-can</v-icon> Delete </v-btn>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col cols="12" md="5">
                    <div>Create Hometown</div>
                    <v-row>
                        <v-col class="d-flex" cols="12">
                            <v-text-field v-model="hometownName" :rules="hometownRules" :counter="50" label="New Hometown" required></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="4">
                            <v-btn :disabled="!valid" color="success" class="mr-4" @click="createHometown">Create Hometown</v-btn>
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
            hometownName: "",
            hometowns: [
                { id: 1, Name: "Abatete" },
                { id: 2, Name: "Nkpor" },
                { id: 3, Name: "Umuoji" }
            ],
            hometownRules: [
                v => !!v || 'Hometown is required',
                v => v.length <= 50 || 'Name must not be more than 50 characters',
            ],
            selectedhometownId: "",
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
            createHometown() {
                alert("added: " + this.hometownName);
                this.error = false;
                this.success = false;
                this.valid = false;
            },
            deleteHometown(id) {
                alert("delete hometown: " + id);
                this.success = true;
                this.error = false;
                this.valid = false
            }
        },
    }
</script>