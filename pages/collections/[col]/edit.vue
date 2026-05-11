<template>
    <div>
        <AppModal :toggle="correctPath">
            <EditCollection />
        </AppModal>
    </div>
</template>

<script setup lang="ts">
const route = useRoute()
const itemId = computed(() => route.params.col)

const accountsCollection = useCollectionStore()
const { toggleEditCollectionModal, toggleDeleteCollectionModal, selectedCollection} = storeToRefs(accountsCollection)

const correctPath = computed(() => {    
    if (typeof route.fullPath === 'string' && typeof itemId === 'string') {
        return route.fullPath === `/collections/${itemId}/edit`
    }
    else return false
}) 
</script>