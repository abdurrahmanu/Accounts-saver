<script lang="ts" setup>
const accountsCollection = useCollectionStore()
const { toggleEditCollectionModal, selectedCollection} = storeToRefs(accountsCollection)
const {openCollection} = accountsCollection

const selectMode = useSelectListStore()
const {selectedList, ongoingSelection} = storeToRefs(selectMode)

const accountStore = useAccountStore()
const {accounts, selectedBank} = storeToRefs(accountStore)

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
  <!-- // work on @click so collectoins can open and close -->
    <div
    @touchstart="selectMode.start($event, collection)" 
    @touchend="selectMode.stop($event, collection)" 
    @mouseup="selectMode.stop($event, collection)"
    @mousedown="selectMode.start($event, collection)"
    @click="!ongoingSelection && openCollection(collection)"
    :class="{
      'bg-blue-100 hover:bg-blue-100': selectedList.includes(collection),
      'hover:bg-green-100': !selectedList.includes(collection)
    }"
    class="relative h-32 max-w-50 flex items-center justify-center rounded-lg uppercase ring ring-slate-300" >
      <div class="text-center">
        <p>{{ collection }}</p>
        <p class="text-xs py-2">{{ numberOfAccountsInCollectionFilter ? numberOfAccountsInCollectionFilter + ' accounts' : '-' }}</p>
      </div>
      <SvgEdit @touchstart.stop @touchend.stop @mouseup.stop @mousedown.stop @click.stop="editCollection" v-if='selectedList.includes(collection)' class="w-6 absolute bottom-2 right-2" />
  </div>
  </template>