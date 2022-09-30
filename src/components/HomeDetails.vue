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
    mounted() { },
    methods: {
        getLandingPageInfo() {
            HTTP.get("/api/landingPage/6132BDB1-BE3E-49A2-E9B9-08DA6EA9FA91")
                .then(response =>
                    this.populateLandingPageInfo(response.data.results.data)
                )
                .catch(() => this.getFailed());
        },
        populateLandingPageInfo(data) {
            //console.log(data);
            for (var i = 0; i < data.length; i++) {
                if (data[i].title == "Home") {
                    this.landingPageInfo = data[i].pageContent;
                    break;
                }
            }
        },
        getFailed() {
            console.log("get failed");
        }
    }
};
</script>
