<script lang="ts" setup>
const route = useRoute()

const accountStore = useAccountStore()
const {selectedBank} = storeToRefs(accountStore)

const accountsCollection = useCollectionStore()
const { filteredCollections} = storeToRefs(accountsCollection)
</script>

<template>
    <div v-if="route.name === 'collections'">                
        <div v-if="filteredCollections.length" class="grid grid-cols-[repeat(auto-fit,minmax(min(100%,150px),1fr))] gap-4 p-3">
            <SingleCollection 
            v-for="(collection, index) in filteredCollections" 
            :key="index"
            :collection="collection" />
        </div>
        <div v-else>
            <div class="text-center text-gray-500 py-3 bg-white">
                <SvgBox class="mx-auto w-30 -mb-10"/>
                No collections found{{ selectedBank && selectedBank !== 'all' ? ' in ' + selectedBank.toUpperCase() + ' filter' : '.' }}
                <p>Add some collections</p>
            </div>
        </div>
    </div>
</template>