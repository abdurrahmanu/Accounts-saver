<template>
    <header class="sm:text-left py-5 shadow px-3 fixed top-0 w-full bg-white h-23 z-3 flex items-center justify-between">
      <div>
        <h1 class="font-black font-serif text-gray-900">RETRIEVER</h1>
        <p class="text-gray-500 text-sm">Easily manage your accounts.</p>
      </div>
      <p @click="toggleAddAccountForm" class="text-xs cursor-pointer flex justify-self-end ring rounded-md hover:bg-zinc-200 w-fit px-3 gap-1 h-fit py-1">{{ addNewAccount ? 'Close Form' : 'Add Account' }}</p>
    </header>
</template>

<script setup lang="ts">
const accountStore = useAccountStore()
const {addNewAccount} = storeToRefs(accountStore)

const collectionStore = useAccountsCollection()
const {toggleCollectionForm} = storeToRefs(collectionStore)

const toggleAddAccountForm = () => {
  addNewAccount.value = !addNewAccount.value
  toggleCollectionForm.value = false
}
</script>