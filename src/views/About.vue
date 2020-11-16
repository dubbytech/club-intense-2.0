<template>
    <div class="home">
        <!--<img alt="Vue logo" src="../assets/logo.png" />-->
        <about-details />
    </div>
</template>

<script>
    // @ is an alias to /src
    import AboutDetails from "@/components/AboutDetails.vue";

    export default {
        name: "About",
        components: {
            AboutDetails
        },

    };
</script>
