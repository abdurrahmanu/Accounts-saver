<script lang="ts" setup>
const accountsCollection = useCollectionStore()
const { toggleEditCollectionModal, selectedCollection} = storeToRefs(accountsCollection)
const {openCollection} = accountsCollection

const selectMode = useSelectStore()
const {selectedList, ongoingSelection} = storeToRefs(selectMode)

const accountStore = useAccountStore()
const {accounts, selectedBank} = storeToRefs(accountStore)

const props = defineProps<{
  collection: string,
}>()

const numberOfAccountsInCollectionFilter = computed(() => {
  // if real bank - check | if favourite - check | if all, show all collections
  return accounts.value.filter(account => {
    let conventionalBank = !['favourite', 'all'].includes(account.bank)
    
    return account.collection === props.collection && 
    ((conventionalBank && account.bank === selectedBank.value) || 
    (selectedBank.value === 'all' && account.collection) || 
    (account.favourite && selectedBank.value === 'favourites' && account.collection))
  }).length
})

const editCollection = () => {  
  selectedCollection.value = props.collection  
  toggleEditCollectionModal.value = !toggleEditCollectionModal.value  
}
</script>

<template>
  <NuxtLink :to="`/collections/_/${collection}`">
    <div
    @pointerdown="selectMode.start($event, collection)" 
    @pointerup="selectMode.stop($event, collection)" 
    @pointercancel="selectMode.stop($event, collection)"
    @click="!ongoingSelection && openCollection(collection)"
    :class="{
      'bg-slate-200 hover:bg-slate-200': selectedList.includes(collection),
      'hover:bg-slate-100': !selectedList.includes(collection),
      'border-red-200 border' : !numberOfAccountsInCollectionFilter
    }"
    class="relative h-32 flex items-center justify-center rounded-lg uppercase ring ring-slate-300" >
      <div class="text-center">
        <p>{{ collection }}</p>
        <p class="text-xs py-2">{{ numberOfAccountsInCollectionFilter ? numberOfAccountsInCollectionFilter + ' accounts' : '' }}</p>
      </div>
      <SvgEdit @pointerdown.stop @pointerup.stop @pointercancel.stop @click.stop="editCollection" v-if='selectedList.includes(collection)' class="w-6 absolute bottom-2 right-2" />
    </div>
  </NuxtLink>
  </template>