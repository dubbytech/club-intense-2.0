<template>
    <div class="home">
        <!--<img alt="Vue logo" src="../assets/logo.png" />-->
        <home-details/>
    </div>
</template>

<script>
    // @ is an alias to /src
    import HomeDetails from "@/components/HomeDetails.vue";

    export default {
        name: "Home",
        components: {
            HomeDetails
        },
        created() {
            //alert("hi");
        },
        mounted() {
           
        },
    };
</script>
