<script setup>
const accountsGroup = useAccountsGroup()
const {collections, isCollection} = storeToRefs(accountsGroup)
</script>

<template>
    
    <div v-if="!isCollection" class="flex flex-wrap h-full flex-1 gap-5 p-5">
        <AccountsGroup :collections="collections" />
    </div>
    
    <div v-else>
        <p class="ring rounded-md px-2 py-1 text-sm w-fit">BACK</p>
    </div>
</template>