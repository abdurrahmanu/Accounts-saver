<template>
    <div>
        <AppModal :toggle="correctPath">
            <DeleteAccounts />
        </AppModal>
    </div>
</template>

<script setup lang="ts">
const route = useRoute()

const selectStore = useSelectStore()
const {selectedList} = storeToRefs(selectStore)

const correctPath = computed(() => {    
    if (route.fullPath.length && selectedList.value.length) {
        return route.fullPath === `/collections/${route.params.col}/_/delete`
    }
    else return false
}) 
</script>
