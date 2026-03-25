<template>
    <SearchAndFilters v-if="!route.fullPath.includes('/addAccount')" />
    <AccountList />
    <NuxtPage />
</template>

<script setup lang="ts">
const route = useRoute()
</script>