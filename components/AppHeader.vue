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
    <div>
      <button v-if="view === 'bank'" @click="toggleAddAccountForm" class="text-xs ring-slate-400 cursor-pointer flex items-center gap-2 justify-self-end ring rounded-md hover:bg-slate-200 w-fit px-2 h-fit py-1">
        {{ addNewAccount ? 'Close Form' : 'Add Account' }}
        <div>
          <SvgPlus v-if="!addNewAccount" class="w-4"/>
          <SvgMinus v-else class="w-4"/>
        </div>
      </button>

      <button v-if="view === 'collections'" @click="toggleAddCollectionForm" class="text-xs px-2 py-1 hover:slate-300 cursor-pointer ring ring-slate-400 flex items-center gap-2 rounded-md">
          {{ toggleCollectionForm ? 'Close Form' : 'Add Collection' }} 
          <div>
              <SvgPlus v-if="!toggleCollectionForm" class="w-4"/>
              <SvgMinus v-else class="w-4"/>
          </div>
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
const accountStore = useAccountStore()
const {addNewAccount} = storeToRefs(accountStore)

const collectionStore = useCollectionStore()
const {toggleCollectionForm, view} = storeToRefs(collectionStore)

const selectStore = useSelectStore()
const {cancel} = selectStore

const toggleAddAccountForm = () => {
  cancel()
  addNewAccount.value = !addNewAccount.value
  toggleCollectionForm.value = false
}

const toggleAddCollectionForm = () => {
  cancel()
  toggleCollectionForm.value = !toggleCollectionForm.value
  addNewAccount.value = false
}
</script>