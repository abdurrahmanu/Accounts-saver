<template>
    <div>
        <AppModal :toggle="correctPath">
            <DeleteCollection />
        </AppModal>
    </div>
</template>

<script setup lang="ts">
const route = useRoute()

const accountsCollection = useCollectionStore()
const { toggleEditCollectionModal, toggleDeleteCollectionModal, selectedCollection} = storeToRefs(accountsCollection)

const correctPath = computed(() => {    
    if (typeof route.fullPath === 'string') {
        return route.fullPath === `/collections/_/${selectedCollection.value}/delete`
    }
    else return false
}) 
</script>
