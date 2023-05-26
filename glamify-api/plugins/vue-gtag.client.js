import VueGtag from 'vue-gtag-next'
export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(VueGtag, {
        property: {
            id: 'GTM-MLQ4J86'
        }
    })
})