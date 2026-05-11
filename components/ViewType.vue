<script setup lang="ts">
const route = useRoute()
const switchTab = async (path: string) => navigateTo(path, {replace: true})
</script>

<template>
    <ul class="text-[10px] text-center space-y-1 transition-all duration-200 w-[30%]">  
        <li 
        @click="switchTab('/accounts')" 
        :class="[route.name?.toString().includes('accounts') ? 'bg-green-300 hover:bg-green-300 text-green-700' : 'bg-white']" 
        class="list-item">
            <SvgBank class="w-7"/>
            ACCOUNTS
        </li>
        <li 
        @click="switchTab('/collections')" 
        :class="[route.name?.toString().includes('collections') ? 'bg-green-300 hover:bg-green-300 text-green-700' : 'bg-white']" 
        class="list-item">
            <SvgGrid class="w-4 py-1"/> 
            <span class="pl-1">COLLECTIONS</span>
        </li>
    </ul>
</template>

<style scoped>
@reference "tailwindcss";

.list-item {
    @apply rounded-lg flex-1 flex items-center gap-1 border border-slate-400 p-2 hover:bg-green-200
}
</style>