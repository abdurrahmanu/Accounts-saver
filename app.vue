<template>
  <div class="pb-24 text-gray-900 font-sans mt-23 selection:bg-none selet-none">
    <AppHeader />
      <div class="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-x-4">
        <div v-if="addNewAccount">
          <AddAccountForm />
          <AddAccountJSON />
        </div>
        <div v-else>
          <SearchAndFilters />
          <Collections />
          <AccountList />
        </div>
    </div>
  </div>
  <ToolBar />

  <AppModal :toggle="editModalSwitch">
    <EditAccount :account="editingAccount"  />
  </AppModal>
</template>

<script setup lang="ts">
const accountStore = useAccountStore()
const {addNewAccount, accounts, editModalSwitch} = storeToRefs(accountStore)

const selectStore = useSelectListStore()
const {selectedList} = storeToRefs(selectStore)

const editingAccount = computed(() => {
    return accounts.value.filter(account => account.id === selectedList.value[0])[0]
})
</script>