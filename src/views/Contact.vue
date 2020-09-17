<template>
    <div>
        <contact-details></contact-details>
    </div>
</template>

<script>
    import ContactDetails from "@/components/ContactDetails";

    export default {
        components: {
            ContactDetails
        },
        data() {
            return {
                tab: null

            }
        },  
    }
</script>

<style scoped>

</style>