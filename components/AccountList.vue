<template>
  <div v-if="showAccountsList" class="px-3">
    <div class="flex justify-between items-center py-3">
      <div class="flex gap-3">
        <p v-if="view === 'collections'" @click="isCollection = false" class="ring rounded-md cursor-pointer px-2 py-1 text-sm w-fit">BACK</p>
        <h3 v-if="isCollection && view === 'collections'" class="uppercase font-bold">{{ currentCollection }}</h3>
      </div>
      <p class="uppercase font-mono">{{ selectedBank }} ({{selectedBank === 'all'  ? accounts.length : numberOfAccountsFiltered }})</p>
    </div>

    <div v-if="store.filteredAndCategorizedAccounts.length === 0" class="text-center text-gray-500 py-8 bg-white">
      No accounts found. add some accounts!
    </div>

    <div v-for="category in store.filteredAndCategorizedAccounts" :key="category.bankName" class="bg-white">
      <AccountItem 
      v-for="account in category.accounts" 
      :key="account.id" 
      :account="account" />
    </div>
  </div>  

  <PopUp v-if="popUp"/>
</template>

<script setup lang="ts">
const accountStore = useAccountStore()
const {selectedBank, numberOfAccountsFiltered, accounts, filteredAndCategorizedAccounts} = storeToRefs(accountStore)

const collections = useAccountsCollection()
const {isCollection, currentCollection, view, showAccountsList} = storeToRefs(collections)

const store = useAccountStore()
const {popUp} = storeToRefs(store)
</script>