<template>
    <div>
        <SearchAndFilters v-if="!route.fullPath.includes('addCollection')" />
        <Collections />
        <NuxtPage />
    </div>
</template>

<script setup lang="ts">
const route = useRoute()
</script>
