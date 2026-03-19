<template>
  <div :class="{
    'bg-slate-200 hover:bg-slate-200': selectedList.includes(account.id),
    'hover:bg-zinc-200': !selectedList.includes(account.id),
    'border-l-green-500': account.favourite,
    'border-l-transparent': !account.favourite
  }"
  @touchstart.prevent="selectMode.start(account.id)" 
  @touchend="selectMode.stop(account.id)" 
  @mouseup="selectMode.stop(account.id)"
  @mousedown="selectMode.start(account.id)"
  class="text-xs px-4 py-2 border-y border-y-gray-200 transition flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative border-l-6">
  {{ account.collection }}
  <div class="flex justify-between w-full">
    <div class="flex gap-2 items-center">
      <div v-if="ongoingSelection">
        <img v-if="selectedList.includes(account.id)" src="/checkedbox.svg" class="w-5" alt="">
        <img v-else src="/uncheckedbox.svg" class="w-5" alt="">
      </div>
      <div>
        <div class="flex gap-2 items-start">
          <div>
            <h4 class="font-medium text-gray-800 uppercase">{{ account.name }} <span v-if="account.nickname" class="text-gray-500 font-normal text-sm">({{ account.nickname }})</span></h4>
            <p class="text-gray-800 mt-1 font-mono bg-gray-200 inline-block px-2 py-1 rounded">
              {{ account.accountNumber }}
            </p>
            <p v-if="selectedBank === 'all'">{{ account.bank }}</p>
          </div>
        </div>
      </div>
    </div>
    <img @click="copyToClipboard" v-if="!copied" class="w-6" src="/tocopy.svg" alt="">
    <img v-else class="w-6" src="/copied.svg" alt="">
  </div>
  </div>
</template>

<script setup lang="ts">
const selectMode = useSelectListStore()
const {selectedList, ongoingSelection} = storeToRefs(selectMode)

const accountStore = useAccountStore()
const {selectedBank} = storeToRefs(accountStore)

const emit = defineEmits<{
  accountID: [id: string]
}>()

const props = defineProps<{
  account: Account,
}>()

const copied = ref(false)

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(props.account.accountNumber)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy text: ', err)
  }
}
</script>