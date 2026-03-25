<script lang="ts" setup>
const route = useRoute()

const listStore = useSelectStore()
const {cancel} = listStore

const switchTab = async (path: string) => {
    cancel()

    if (path === 'col' && route.fullPath.includes('/accounts')) {        
        navigateTo('/collections', {replace: true})                
    }
    
    else if (path === 'acc' && route.fullPath.includes('/collections')) {
        navigateTo('/accounts', {replace: true})
    }
}
</script>

<template>
    <ul class="text-[10px] text-center space-y-1 transition-all duration-200 w-[30%]">  
        <li @click="switchTab('col')" :class="[route.name?.toString().includes('collections') ? 'bg-green-300 hover:bg-green-300 text-green-700' : 'bg-white']" class="list-item"><SvgGrid class="w-4"/> COLLECTIONS</li>
        <li @click="switchTab('acc')" :class="[route.name?.toString().includes('accounts') ? 'bg-green-300 hover:bg-green-300 text-green-700' : 'bg-white']" class="list-item"><SvgBank class="w-6"/>ACCOUNTS</li>
    </ul>
</template>

<style scoped>
@reference "tailwindcss";

.list-item {
    @apply rounded-lg flex-1 flex items-center gap-1 border border-slate-400 p-2 px-1 hover:bg-green-200
}
</style>