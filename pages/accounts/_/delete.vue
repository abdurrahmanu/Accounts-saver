<template>
    <AppModal :toggle="correctPath">
      <DeleteItems />
    </AppModal>
</template>

<script setup lang="ts">
const route = useRoute()

const selectStore = useSelectStore()
const {selectedList} = storeToRefs(selectStore)

const correctPath = computed(() => {    
    if (route.fullPath.length && selectedList.value.length) {
        return route.fullPath === `/accounts/_/delete`
    }
    else return false
}) 
</script>