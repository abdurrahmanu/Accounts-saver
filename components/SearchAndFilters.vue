<template>
  <div class="w-full bg-zinc-200 p-2 py-3 gap-2 mx-auto items-center relative h-fit">
    <div class="space-y-3">
      <div class="flex-1 relative flex items-center">
        <SvgSearch class="w-5 absolute right-2" />
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="Search name, nickname, or account..." 
          class="outline-none w-full text-slate-600 appearance-none border-b border-b-slate-400 focus:ring-blue-500 p-2 py-1">
      </div>
      
      <div class="flex items-center w-full gap-2">
        <div :class="[!accounts.length ? 'bg-transparent' : 'bg-white']" class="rounded-sm w-[75%]">
          <ul v-if="accounts.length" class="flex leading-0 p-2 gap-2 flex-wrap content-start h-20 overflow-y-scroll custom-scrollbar">
            <li 
            @click="selectedBank = 'favourites'"
            :class="{'selected': selectedBank === 'favourites', 'ring-slate-300': selectedBank !== 'favourites',}" 
            class="list-item" 
            >Favourites</li>
          <li 
          @click="selectedBank = 'all'"
          :class="{'selected': selectedBank === 'all', 'ring-slate-300': selectedBank !== 'all',}" 
          class="list-item" 
          >All</li>
          <li 
          @click="selectedBank = bank"
          :class="{'selected': selectedBank === bank, 'ring-slate-300': selectedBank !== bank,}" 
          class="list-item" 
          v-for="(bank, index) in uniqueBanks" 
          :key="index">{{ bank }}</li>
          </ul>
          <p v-else class="text-xs text-red-400 text-center p-2">No filters available</p>
        </div>
        <ViewType />
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
const accountStore = useAccountStore()
const {uniqueBanks, selectedBank, searchQuery, accounts} = storeToRefs(accountStore)
</script>

<style scoped>
@reference "tailwindcss";

.list-item {
  @apply w-fit h-fit px-2 hover:bg-green-200 transition-colors duration-150 cursor-pointer whitespace-nowrap text-xs ring-1 rounded-sm
}

.selected {
  @apply ring-green-400 text-green-700 bg-green-200
}
</style>