<script lang="ts" setup>
const accountsCollection = useAccountsCollection()
const {openCollection} = accountsCollection

const selectMode = useSelectListStore()
const {selectedList, ongoingSelection} = storeToRefs(selectMode)

const props = defineProps<{
  collection: string,
}>()
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
      @click="!ongoingSelection && openCollection(collection)" class="w-[30%] h-32 `max-w-[200px]` md:w-50 md:h-50 flex items-center justify-center grow rounded-lg uppercase ring ring-slate-300" >{{ collection }}</div>
</template>