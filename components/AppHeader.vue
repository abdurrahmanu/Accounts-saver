<template>
  <header class="sm:text-left py-5 shadow px-2 fixed top-0 w-full bg-white h-23 z-3 flex items-center justify-between">
    <div>
      <div class="flex items-center gap-1 top-1 text-xs font-bold">
        <SvgLogo class="w-10 rotate-12 relative -top-1"/>
        <div>  
          <p>ACCOUNTS MANAGER</p>
          <p class="text-gray-500 font-medium text-[10px] text-sm">Easily manage your accounts.</p>
        </div>
      </div>
    </div>
    <button @click="toggleAddAccountForm" class="text-xs ring-slate-400 cursor-pointer flex items-center gap-2 justify-self-end ring rounded-md hover:bg-zinc-200 w-fit px-2 h-fit py-1">
      {{ addNewAccount ? 'Close Form' : 'Add Account' }}
      <div>
        <SvgPlus v-if="!addNewAccount" class="w-4"/>
        <SvgMinus v-else class="w-4"/>
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