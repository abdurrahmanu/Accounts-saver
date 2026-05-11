<script lang="ts" setup>
const accountsCollection = useCollectionStore()
const { toggleEditCollectionModal, toggleDeleteCollectionModal, selectedCollection} = storeToRefs(accountsCollection)

const selectMode = useSelectStore()
const {selectedList, ongoingSelection} = storeToRefs(selectMode)
const {start, stop} = selectMode

const accountStore = useAccountStore()
const {accounts, selectedBank} = storeToRefs(accountStore)

const props = defineProps<{
  collection: string,
}>()

const numberOfAccountsInCollectionFilter = computed(() => {
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
  navigateTo(`/collections/_/${props.collection}/edit`)
}

const deleteCollection = () => {
  selectedCollection.value = props.collection
  toggleDeleteCollectionModal.value = !toggleDeleteCollectionModal.value
  navigateTo(`/collections/_/${props.collection}/delete`)
}
</script>

<template>
  <NuxtLink :to="!ongoingSelection ? `/collections/${collection}` : undefined" >
    <div
    @pointerdown="start($event, collection)" 
    @pointerup="stop($event, collection, true)" 
    @pointercancel="stop($event, collection)"
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
      <div class="flex">
        <SvgEdit @pointerdown.stop @pointerup.stop @pointercancel.stop @click.stop="editCollection" v-if='selectedList.includes(collection)' class="w-5 absolute bottom-2 right-8" />
        <SvgDelete @pointerdown.stop @pointerup.stop @pointercancel.stop @click.stop="deleteCollection" v-if='selectedList.includes(collection)' class="w-5 absolute bottom-2 right-1" />
      </div>
    </div>
  </NuxtLink>
</template>