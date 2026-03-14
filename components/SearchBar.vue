<template>
  <div class="bg-white px-4 shadow-sm flex flex-col md:flex-row gap-4">
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
        @click="selectedBank = bank"
        :class="{
          'bg-green-300 hover:bg-green-300': selectedBank === bank,
          'shrink-0': index === uniqueBanks.length - 1,
          'grow': index !== uniqueBanks.length - 1
        }" 
        class="w-fit px-3 hover:bg-green-200 transition-colors duration-150 cursor-pointer py-1 rounded-md whitespace-nowrap text-xs ring-[1px] ring-slate-300" 
        v-for="(bank, index) in uniqueBanks" 
        :key="index">{{ bank }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAccountStore } from '~/stores/useAccountStore'
const accountStore = useAccountStore()
const {uniqueBanks, selectedBank, searchQuery} = storeToRefs(accountStore)
</script>