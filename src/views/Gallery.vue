<template>
    <div class="home">
        <!--<img alt="Vue logo" src="../assets/logo.png" />-->
        <gallery-details />
    </div>
</template>

<script>
    // @ is an alias to /src
    import GalleryDetails from "@/components/GalleryDetails.vue";

    export default {
        name: "Gallery",
        components: {
            GalleryDetails
        },

    };
</script>
