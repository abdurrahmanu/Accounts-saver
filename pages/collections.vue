<script setup lang="ts">
const route = useRoute()
const showCollectionList = computed(() => {
    return (
        !route.fullPath.endsWith('/addCol') &&
        !route.params?.col
    )
})
</script>
 
<template>
    <div>
        <Collections v-if="showCollectionList" />
        <NuxtPage />
    </div>
</template>
