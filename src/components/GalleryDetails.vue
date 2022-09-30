<template>
    <v-container>
        <v-row>
            <div v-html="landingPageInfo"></div>
        </v-row>
        <!-- Slider main container -->
        <div class="swiper">
            <!-- Additional required wrapper -->
            <div class="swiper-wrapper">
                <!-- Slides -->
                <div class="swiper-slide">Slide 1</div>
                <div class="swiper-slide">Slide 2</div>
                <div class="swiper-slide">Slide 3</div>
                ...
            </div>
            <!-- If we need pagination -->
            <div class="swiper-pagination"></div>

            <!-- If we need navigation buttons -->
            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>

            <!-- If we need scrollbar -->
            <div class="swiper-scrollbar"></div>
        </div>
    </v-container>
</template>
<script>
import { HTTP } from "../http-common.js";

// const swiper = new Swiper(".swiper", {
//     // Optional parameters
//     direction: "vertical",
//     loop: true,

//     // If we need pagination
//     pagination: {
//         el: ".swiper-pagination"
//     },

//     // Navigation arrows
//     navigation: {
//         nextEl: ".swiper-button-next",
//         prevEl: ".swiper-button-prev"
//     },

//     // And if we need scrollbar
//     scrollbar: {
//         el: ".swiper-scrollbar"
//     }
// });
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
            HTTP.get("/api/landingPage/6d7544a1-76b4-4cbe-f521-08daa290c0ac")
                .then(response => this.populateLandingPageInfo(response.data))
                .catch(() => this.getFailed());
        },
        populateLandingPageInfo(data) {
            //console.log(data);
            for (var i = 0; i < data.length; i++) {
                if (data[i].title == "Gallery") {
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
<styles scoped>
.swiper {
  width: 600px;
  height: 300px;
}
</styles>
