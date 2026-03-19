<script lang="ts" setup>
const accountsCollection = useAccountsCollection()
const {view, toggleCollectionForm} = storeToRefs(accountsCollection)

const listStore = useSelectListStore()
const {cancel} = listStore

const changeView = (collection: 'bank' | 'collections') => {
    view.value = collection
    cancel()
}
</script>

<template>
    <ul class="text-[10px] text-center space-y-1 transition-all duration-200 w-[30%]">
        <li :class="[view === 'collections' ? 'bg-blue-300 hover:bg-blue-300' : 'bg-white']" @click="changeView('collections')" class="rounded-lg flex-1 flex items-center gap-2 whitespace-nowrap border-r border border-slate-400 p-2 hover:bg-blue-200"><img src="/grid.svg" alt="" class="w-4"> COLLECTIONS</li>
        
        <li :class="[view === 'bank' ? 'bg-blue-300 hover:bg-blue-300' : 'bg-white']"  @click="changeView('bank')" class="rounded-lg flex-1 flex items-center gap-2 whitespace p-2 border border-slate-400  hover:bg-blue-200"><img src="/bank.svg" alt="" class="w-6">BANKS</li>
    </ul>
</template>