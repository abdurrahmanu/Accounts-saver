<template>
  <div>
    <ViewType />
    <div v-if="!createNewcollection" class="bg-white px-4 shadow-sm flex flex-col md:flex-row gap-4">
      <div class="flex-1">
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="Search name, nickname, or account..." 
          class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
        >
      </div>
      
      <div class="md:w-64">
        <ul class="flex py-5 pt-0 gap-2 flex-wrap">
          <li 
          @click="selectedBank = 'all'"
          :class="{
            'ring-green-400': selectedBank === 'all',
            'ring-slate-300': selectedBank !== 'all'
          }" 
          class="w-fit px-2 hover:bg-green-200 transition-colors duration-150 cursor-pointer `py-[2px]` whitespace-nowrap text-xs ring-2" 
          >All</li>
          <li 
          @click="selectedBank = bank"
          :class="{
            'ring-green-400': selectedBank === bank,
            'ring-slate-300': selectedBank !== bank
          }" 
          class="w-fit px-2 hover:bg-green-200 transition-colors duration-150 cursor-pointer `py-[2px]` whitespace-nowrap text-xs ring-2 " 
          v-for="(bank, index) in uniqueBanks" 
          :key="index">{{ bank }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAccountStore } from '~/stores/useAccountStore'
const accountStore = useAccountStore()
const {uniqueBanks, selectedBank, searchQuery} = storeToRefs(accountStore)

const collectionStore = useAccountsCollection()
const {createNewcollection} = storeToRefs(collectionStore)
</script>