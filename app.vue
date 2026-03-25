<template>
  <div class="select-none selection:bg-none">
    <NuxtPwaManifest />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <ToolBar />
    
    <AppModal :toggle="toggleEditAccountModal">
      <EditAccount :account="editingAccount"  />
    </AppModal>
    
    <AppModal :toggle="toggleEditCollectionModal">
      <EditCollection />
    </AppModal>

    <AppModal :toggle="toggleDeleteAccountModal">
      <PopUp/>
    </AppModal>
  </div>
</template>

<script setup lang="ts">
const accountStore = useAccountStore()
const { accounts, toggleEditAccountModal, toggleDeleteAccountModal} = storeToRefs(accountStore)

const collectionStore = useCollectionStore()
const {toggleEditCollectionModal} = storeToRefs(collectionStore)

const selectStore = useSelectStore()
const {selectedList} = storeToRefs(selectStore)

const editingAccount = computed(() => {
    return accounts.value.filter(account => account.id === selectedList.value[0])[0]
})
</script>