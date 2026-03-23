<template>
  <div class="bg-slate-200 p-2 py-3 gap-2 max-w-150 mx-auto items-center relative">
    <div class="space-y-3">
      <div class="flex-1 relative flex items-center">
        <img src="/search.svg" class="absolute w-5 right-2" alt="">
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="Search name, nickname, or account..." 
          class="outline-none w-full text-slate-600 appearance-none border-b border-b-slate-400 focus:ring-blue-500 p-2 py-1">
      </div>
      
      <div class="flex items-center w-full gap-2">
        <div v-if="accounts.length" class="relative md:w-64 h-20 ring ring-slate-300 p-2 overflow-y-scroll rounded-md bg-white w-[75%]">
          <ul v-if="accounts.length" class="flex py-5 pt-0 gap-2 flex-wrap">
            <li 
            @click="selectedBank = 'favourites'"
            :class="{
              'ring-green-400 text-green-700 bg-green-200': selectedBank === 'favourites',
              'ring-slate-300': selectedBank !== 'favourites'
            }" 
          class="w-fit px-3 hover:bg-green-200 transition-colors duration-150 cursor-pointer `py-[2px]` whitespace-nowrap text-xs ring-1 rounded-md" 
          >Favourites</li>
          <li 
          @click="selectedBank = 'all'"
          :class="{
            'ring-green-400 text-green-700 bg-green-200': selectedBank === 'all',
            'ring-slate-300': selectedBank !== 'all'
          }" 
          class="w-fit px-3 hover:bg-green-200 transition-colors duration-150 cursor-pointer `py-[2px]` whitespace-nowrap text-xs ring-1 rounded-md" 
          >All</li>
          <li 
          @click="selectedBank = bank"
          :class="{
            'ring-green-400 text-green-700 bg-green-200': selectedBank === bank,
            'ring-slate-400': selectedBank !== bank
          }" 
          class="w-fit px-3 hover:bg-green-200 transition-colors duration-150 cursor-pointer `py-[2px]` whitespace-nowrap text-xs ring-1 rounded-md" 
          v-for="(bank, index) in uniqueBanks" 
          :key="index">{{ bank }}</li>
        </ul>
      </div>
      <p v-else class="text-xs text-red-300">No filters available</p>
      <ViewType />
    </div>
  </div>
</div>

<p>{{ filteredAndCategorizedAccounts.length ? '' : '' }}</p>
</template>

<script setup lang="ts">
const accountStore = useAccountStore()
const {uniqueBanks, selectedBank, searchQuery, accounts, filteredAndCategorizedAccounts} = storeToRefs(accountStore)
</script>