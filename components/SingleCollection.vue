<script lang="ts" setup>
const accountsCollection = useCollectionStore()
const {currentCollection, isCollection, toggleEditCollectionModal, selectedCollection} = storeToRefs(accountsCollection)
const {openCollection} = accountsCollection

const selectMode = useSelectListStore()
const {selectedList, ongoingSelection} = storeToRefs(selectMode)

const accountStore = useAccountStore()
const {accounts, filteredAndCategorizedAccounts, selectedBank} = storeToRefs(accountStore)

const props = defineProps<{
  collection: string,
}>()

const numberOfAccountsInCollectionFilter = computed(() => {
  return accounts.value.filter(account => account.collection === props.collection && (account.bank === selectedBank.value || selectedBank.value === 'all' || (account.favourite && selectedBank.value === 'favourites'))).length
})

const editCollection = () => {
  selectedCollection.value = props.collection  
  toggleEditCollectionModal.value = !toggleEditCollectionModal.value  
}
</script>

<template>
    <div
      @touchstart.self="selectMode.start(collection)" 
      @touchend.self="selectMode.stop(collection)" 
      @mouseup.self="selectMode.stop(collection)"
      @mousedown.self="selectMode.start(collection)"
      :class="{
        'bg-blue-100 hover:bg-blue-100': selectedList.includes(collection),
        'hover:bg-green-100': !selectedList.includes(collection)
      }"
      @click="!ongoingSelection && openCollection(collection)" class="relative w-[30%] h-32 max-w-50 md:w-50 md:h-50 flex items-center justify-center grow rounded-lg uppercase ring ring-slate-300" >
      <div class="text-center">
        <p>{{ collection }}</p>
        <p class="text-xs py-2">{{ numberOfAccountsInCollectionFilter ? numberOfAccountsInCollectionFilter + ' accounts' : '-' }}</p>
      </div>
      <img @click.stop="editCollection" v-if='selectedList.includes(collection)' src="/edit.svg" class="w-6 absolute bottom-2 right-2" alt="">
    </div>
</template>