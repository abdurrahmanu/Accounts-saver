<template>
    <AppModal :toggle="correctPath">
      <EditCollection />
    </AppModal>
</template>

<script setup lang="ts">
const route = useRoute()
const itemId = computed(() => route.params.id)

const correctPath = computed(() => {    
    if (typeof route.fullPath === 'string' && typeof itemId === 'string') {
        return route.fullPath === `/collections/${itemId}/edit`
    }
    else return false
}) 
</script>