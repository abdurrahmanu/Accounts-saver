<template>
  <div :class="{
    'bg-blue-100': selectedList.includes(account.id)
  }"
  @mousedown="activateList.start(account.id)" 
  @mouseup="activateList.stop(account.id)" 
  class="px-4 py-2 border-y border-gray-200 hover:bg-blue-200 transition flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
    <div class="flex justify-between w-full">
      <div class="flex gap-2 items-start">
        <div>
          <h4 class="text-sm font-medium text-gray-800 uppercase">{{ account.name }} <span v-if="account.nickname" class="text-gray-500 font-normal text-sm">({{ account.nickname }})</span></h4>
          <p class="text-gray-800 mt-1 font-mono bg-gray-200 inline-block px-2 py-1 rounded">
        {{ account.accountNumber }}
          </p>
        </div>
      </div>
      
        <button 
        @click="copyToClipboard" 
        class="sm:flex-none text-[9px] bg-gray-100 h-fit p-2 px-4 rounded-md hover:bg-slate-200 ring-1 ring-slate-400 transition"
        >
        {{ copied ? 'Copied!' : 'Copy' }}
      </button>
  </div>
  </div>
  
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAccountStore, type Account } from '~/stores/useAccountStore'
import { useSelectListStore } from '~/stores/useSelectListStore';

const activateList = useSelectListStore()
const {selectedList} = storeToRefs(activateList)

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