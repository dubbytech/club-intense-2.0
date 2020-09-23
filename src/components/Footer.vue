<template>
    <v-footer color="primary lighten-1" padless>
        <v-row justify="center" no-gutters>
            <v-btn v-for="link in footerLinks" :key="link.text" router :to="link.route" color="white" text rounded class="my-2"> {{ link.text }}</v-btn>
            <v-col class="primary lighten-2 py-4 text-center white--text" cols="12">
                {{ new Date().getFullYear() }} — <strong>{{company}}</strong>
            </v-col>
        </v-row>
    </v-footer>
</template>

<script>
    export default {
        data: () => ({
            footerLinks: [
                { icon: 'home', text: 'Home', route: '/' },
                { icon: 'contacts', text: 'About', route: '/about' },
                { icon: 'contacts', text: 'Gallery', route: '/gallery' },
                { icon: 'contacts', text: 'Contact', route: '/contact' }
            ],
            company: "Dubby Tech"
        }),
    }
</script>