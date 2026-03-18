<template>
    <header class="sm:text-left py-5 shadow px-3 fixed top-0 w-full bg-white h-23 z-3 flex items-center justify-between">
      <div>
        <h1 class="font-black font-mono text-gray-900">RETRIEVER</h1>
        <p class="text-gray-500 text-sm">Easily manage your accounts.</p>
      </div>
      <button @click="toggleAddAccountForm" class="text-xs ring-slate-400 cursor-pointer flex items-center gap-2 justify-self-end ring rounded-md hover:bg-zinc-200 w-fit px-2 h-fit py-1">{{ addNewAccount ? 'Close Form' : 'Add Account' }}<img src="/add.svg" class="w-5"></button>
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