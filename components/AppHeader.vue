<template>
    <header class="sm:text-left py-5 shadow px-3 fixed top-0 w-full bg-white h-23 z-3 flex items-center justify-between">
      <div class="px-2">
        <div class="flex items-center gap-2 text-xs font-bold">
          <img src="/account-manager.svg" alt="" class="w-10">
          <div>  
            <p>ACCOUNTS MANAGER</p>
            <p class="text-gray-500 font-medium text-[10px] text-sm">Easily manage your accounts.</p>
          </div>
        </div>
      </div>
      <button @click="toggleAddAccountForm" class="text-xs ring-slate-400 cursor-pointer flex items-center gap-2 justify-self-end ring rounded-md hover:bg-zinc-200 w-fit px-2 h-fit py-1">
        {{ addNewAccount ? 'Close Form' : 'Add Account' }}
        <div>
          <img v-if="!addNewAccount" src="/plus.svg" class="w-5">
          <img v-else src="/minus.svg" class="w-5">
        </div>
      </button>
    </header>
</template>

<script setup lang="ts">
const accountStore = useAccountStore()
const {addNewAccount} = storeToRefs(accountStore)

const collectionStore = useCollectionStore()
const {toggleCollectionForm} = storeToRefs(collectionStore)

const toggleAddAccountForm = () => {
  addNewAccount.value = !addNewAccount.value
  toggleCollectionForm.value = false
}
</script>