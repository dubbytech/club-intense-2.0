<template>
    <v-app>
        <Navbar></Navbar>
        <router-view></router-view>
        <Footer></Footer>
    </v-app>
</template>

<script>
    import Navbar from "@/components/Navbar";
    import Footer from "@/components/Footer";

    export default {
        name: "App",
        components: {
            Navbar,
            Footer
        },
        data: () => ({
            //
        }),
        beforeDestroy() {
           
        },
        created() {
           
        },
        mounted() {
            
        },
    }
</script>
