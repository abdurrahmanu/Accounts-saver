<script setup lang="ts">
const route = useRoute()

const showFilterRoutes = computed(() => {
    return (!route.fullPath.includes('/addCollection') && !route.fullPath.includes('/addAccount'))
})
</script>

<template>
    <div class="flex flex-col max-h-dvh">
        <AppHeader />
        <SearchAndFilters v-if="showFilterRoutes" />
        <slot/>
    </div>
</template>