<template>
    <v-container>
        <v-row>
            <div v-html="landingPageInfo"></div>
        </v-row>
    </v-container>
</template>
<script>
    import { HTTP } from "../http-common.js";
    export default {
        data: () => ({
            valid: false,
            landingPageInfo: ""
        }),
        created() {
            this.getLandingPageInfo();
        },
        mounted() {

        },
        methods: {
            getLandingPageInfo() {
                HTTP.get('/api/landingPage/')
                    .then(response => this.populateLandingPageInfo(response.data.results.data))
                    .catch(() => this.getFailed())
            },
            populateLandingPageInfo(data) {
                //console.log(data);
                for (var i = 0; i < data.length; i++) {
                    if (data[i].title == "About") {
                        this.landingPageInfo = data[i].pageContent;
                        break;
                    }
                }
            },
            getFailed() {
                console.log("get failed");
            }
        }
    }

</script>