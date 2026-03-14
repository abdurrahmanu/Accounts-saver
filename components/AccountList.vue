<template>
  <div class="space-y-8 px-3">
    <h3 v-if="isCollection && view === 'collections'">{{ currentCollection }}</h3>

    <div v-if="store.filteredAndCategorizedAccounts.length === 0" class="text-center text-gray-500 py-8 bg-white">
      No accounts found. add some accounts!
    </div>
    <div v-for="category in store.filteredAndCategorizedAccounts" :key="category.bankName" class="bg-white">
      <h3 v-if="view === 'bank'" class="text-lg font-bold py-2 pl-4">{{ category.bankName }}</h3>
      <AccountItem 
      v-for="account in category.accounts" 
      :key="account.id" 
      :account="account" />
    </div>
  </div>  

  <PopUp v-if="popUp"/>
</template>

<script setup lang="ts">
import { useAccountStore } from '~/stores/useAccountStore'

const groupStore = useAccountsGroup()
const {isCollection, currentCollection, view} = storeToRefs(groupStore)

const store = useAccountStore()
const {popUp} = storeToRefs(store)
</script>
