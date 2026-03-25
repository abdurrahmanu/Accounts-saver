<template>
  <div v-if="showAccountsList">
    <div v-if="filteredAndCategorizedAccounts.length || isCollection" class="flex justify-between items-center py-5">
      <div class="flex gap-3 px-2 text-xs">
        <SvgBack v-if="route.fullPath.includes('collections')" @click="$router.back" class="w-5" />
        <h3 v-if="route.fullPath.includes('collections')" class="uppercase font-bold  px-2 py-1 bg-slate-200 rounded-md">{{ currentCollection }}</h3>
        <p v-else class="font-bold px-2 py-1 bg-slate-200 rounded-md">ACCOUNTS</p>
      </div>
      <p v-if="accounts.length" class="uppercase mr-2 ring ring-slate-300 flex items-center gap-1 px-1 py-0.5 bg-slate-200 rounded-md font-medium">
        <span class="pl-1 text-xs">{{ selectedBank }}</span>
        <span class="font-bold font-mono">[{{ numberOfAccountsInList }}]</span>
      </p>
    </div>
    
    <div v-if="filteredAndCategorizedAccounts.length === 0" class="text-center text-gray-500 py-3 bg-white">
      <SvgBox class="w-30 -mb-10 mx-auto" />
      No accounts  found. 
      <p>Add some accounts</p>
    </div>
    
    <div class="overflow-y-scroll">
      <div v-for="category in filteredAndCategorizedAccounts" :key="category.bankName" class="bg-white">
        <AccountItem 
        v-for="account in category.accounts" 
        :key="account.id" 
        :account="account" />
      </div>
    </div>
  </div>  
</template>

<script setup lang="ts">
const route = useRoute()

const accountStore = useAccountStore()
const {selectedBank, accounts, filteredAndCategorizedAccounts } = storeToRefs(accountStore)

const collections = useCollectionStore()
const {isCollection, currentCollection } = storeToRefs(collections)

const numberOfAccountsInList = computed(() => {
  let allAccounts = []

  filteredAndCategorizedAccounts.value.forEach(acc => {
    allAccounts.push(...acc.accounts)
  });

  return allAccounts.length
})

const showAccountsList = computed(() => {
  return route.name === 'accounts' || route.fullPath.includes('/collections/_/')
})
</script>