<template>
    <header class="sm:text-left py-5 shadow shadow-black/30 px-5 fixed top-0 w-full bg-white h-23 z-3 flex items-center justify-between">
      <div>
        <h1 class="text-xl font-black font-serif text-gray-900">RETRIEVER</h1>
        <p class="text-gray-500 text-sm">Easily manage and copy your saved accounts.</p>
      </div>
      <p @click="addNewAccount = !addNewAccount" class="text-xs cursor-pointer flex justify-self-end ring rounded-md hover:bg-zinc-200 w-fit px-5 gap-1 h-fit py-1">{{ addNewAccount ? 'Close Form' : 'Add Account' }}</p>
    </header>
</template>

<script setup lang="ts">
const accountStore = useAccountStore()
const {addNewAccount} = storeToRefs(accountStore)
</script>