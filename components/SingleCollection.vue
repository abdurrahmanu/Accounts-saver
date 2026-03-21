<script lang="ts" setup>
const accountsCollection = useCollectionStore()
const {openCollection} = accountsCollection

const selectMode = useSelectListStore()
const {selectedList, ongoingSelection} = storeToRefs(selectMode)

const accountStore = useAccountStore()
const {accounts} = storeToRefs(accountStore)

const props = defineProps<{
  collection: string,
}>()

const numberOfAccountsInCollection = computed(() => {
  return accounts.value.filter(account => account.collection === props.collection).length
})
</script>

<template>
    <div
      @touchstart.prevent="selectMode.start(collection)" 
      @touchend="selectMode.stop(collection)" 
      @mouseup="selectMode.stop(collection)"
      @mousedown="selectMode.start(collection)"
      :class="{
        'bg-blue-100 hover:bg-blue-100': selectedList.includes(collection),
        'hover:bg-green-100': !selectedList.includes(collection)
      }"
      @click="!ongoingSelection && openCollection(collection)" class="w-[30%] h-32 `max-w-[200px]` md:w-50 md:h-50 flex items-center justify-center grow rounded-lg uppercase ring ring-slate-300" >
      <div class="text-center">
        <p>{{ collection }}</p>
        <p>{{ numberOfAccountsInCollection ? numberOfAccountsInCollection : '-' }}</p>
      </div>
      </div>
</template>