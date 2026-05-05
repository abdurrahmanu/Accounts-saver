<script setup lang="ts">
const route = useRoute()
const collectionHome = computed(() => {
    return (route.fullPath === '/collections' || route.fullPath === '/collections/_')
})
</script>
 
<template>
    <div>
        <Collections v-if="collectionHome" />
        <NuxtPage />
    </div>
</template>
