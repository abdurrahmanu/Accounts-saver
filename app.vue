<template>
  <div>
    <NuxtPwaManifest />
    <div class="pb-24 text-gray-900 font-sans mt-23 selection:bg-none selet-none">
      <AppHeader />
      <div class="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-x-4">
        <div v-if="addNewAccountOrCollection">
          <AddAccountForm />
          <AddCollectionForm />
        </div>
        <div v-else>
          <SearchAndFilters />
          <!-- <InstallApp /> -->
          <Collections />
          <AccountList />
        </div>
      </div>
    </div>
    <ToolBar />
    
    <AppModal :toggle="toggleEditAccountModal">
      <EditAccount :account="editingAccount"  />
    </AppModal>
    
    <AppModal :toggle="toggleEditCollectionModal">
      <EditCollection />
    </AppModal>
  </div>
</template>

<script setup lang="ts">
const accountStore = useAccountStore()
const {addNewAccount, accounts, toggleEditAccountModal} = storeToRefs(accountStore)

const collectionStore = useCollectionStore()
const {toggleEditCollectionModal, toggleCollectionForm} = storeToRefs(collectionStore)

const selectStore = useSelectStore()
const {selectedList} = storeToRefs(selectStore)

const editingAccount = computed(() => {
    return accounts.value.filter(account => account.id === selectedList.value[0])[0]
})

const addNewAccountOrCollection = computed(() => {
  return addNewAccount.value || toggleCollectionForm.value
})

// window.addEventListener('popstate', (event) => {
//   console.log('tester');
  
// })

on(() => {
  console.log('updated');
  
})
</script>