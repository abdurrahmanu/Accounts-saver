<template>
  <div class="min-h-screen pb-24 text-gray-900 sm:p-8 font-sans pt-23">
    <header class="sm:text-left py-5 shadow shadow-black/30 px-5 fixed top-0 w-full bg-white h-23 z-3">
      <h1 class="text-xl font-black font-serif text-gray-900">RETRIEVER</h1>
      <p class="text-gray-500 text-sm">Easily manage and copy your saved accounts.</p>
    </header>
    
    <div class="max-w-5xl mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
        
        <div class="lg:col-span-1">
          <AccountForm />
        </div>

        <ViewType/>
        
        <SearchBar />
        <GroupsList v-if="view === 'collections'" />

        <div class="lg:col-span-2 space-y-3 bg-white">
          <ClientOnly>
            <AccountList />
            <template #fallback>
              <div class="text-center py-10 text-gray-500">Loading your accounts...</div>
            </template>
          </ClientOnly>
        </div>

      </div>
    </div>
  </div>

  <ToolBar />
</template>

<script setup lang="ts">
const accountsGroup = useAccountsGroup()
const {view} = storeToRefs(accountsGroup)

const accountStore = useAccountStore()
const {addNewAccount} = storeToRefs(accountStore)
</script>
