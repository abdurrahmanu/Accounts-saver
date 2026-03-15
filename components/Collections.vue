<script setup>
const accountsGroup = useAccountsCollection()
const {collections, isCollection, currentCollection, view} = storeToRefs(accountsGroup)
</script>

<template>
    <div v-if="view === 'collections' && !isCollection" class="flex flex-wrap h-full flex-1 gap-5 p-5">
        <SingleCollection :collections="collections" />
    </div>
</template>