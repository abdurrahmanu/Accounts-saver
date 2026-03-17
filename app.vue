<template>
  <div class="pb-24 text-gray-900 font-sans mt-23">
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
</template>

<script setup lang="ts">
const accountStore = useAccountStore()
const {addNewAccount} = storeToRefs(accountStore)
</script>
