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
        // this.getLandingPageInfo();
    },
    methods: {
        getLandingPageInfo() {
            HTTP.get("/api/landingPage/368b53a0-6b68-4258-966c-08daa256d1d1")
                .then(response => this.populateLandingPageInfo(response.data))
                .catch(() => this.getFailed());
        },
        populateLandingPageInfo(data) {
            // console.log(data);
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
