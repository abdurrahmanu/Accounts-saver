<template>
  <div v-if="showAccountsList">
    <div v-if="filteredAndCategorizedAccounts.length || isCollection" class="flex justify-between items-center py-5">
      <div class="flex gap-3 px-2">
        <img v-if="view === 'collections'" @click="isCollection = false" src="/back.svg" alt="" class="w-5">
        <h3 v-if="isCollection && view === 'collections'" class="uppercase font-bold">{{ currentCollection }}</h3>
      </div>
      <p v-if="accounts.length" class="uppercase font-mono pr-2">{{ selectedBank }} ({{ numberOfAccountsInList }})</p>


    </div>

    <div v-if="filteredAndCategorizedAccounts.length === 0" class="text-center text-gray-500 py-10 bg-white">
      <img src="/empty-box.svg" alt="" class="mx-auto w-40">
      No accounts found. add some accounts!
    </div>

    <div v-for="category in filteredAndCategorizedAccounts" :key="category.bankName" class="bg-white">
      <AccountItem 
      v-for="account in category.accounts" 
      :key="account.id" 
      :account="account" />
    </div>
  </div>  

  <AppModal :toggle="toggleDeleteAccountModal">
    <PopUp/>
  </AppModal>
</template>

<script setup lang="ts">
const accountStore = useAccountStore()
const {selectedBank, accounts, filteredAndCategorizedAccounts, toggleDeleteAccountModal} = storeToRefs(accountStore)

const collections = useCollectionStore()
const {isCollection, currentCollection, view, showAccountsList} = storeToRefs(collections)

const numberOfAccountsInList = computed(() => {
  let allAccounts = []

  filteredAndCategorizedAccounts.value.forEach(acc => {
    allAccounts.push(...acc.accounts)
  });

  return allAccounts.length
})
</script>