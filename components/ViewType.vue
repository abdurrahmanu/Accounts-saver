<script lang="ts" setup>
const accountsGroup = useAccountsCollection()
const {view} = storeToRefs(accountsGroup)
</script>

<template>
    <div class="px-5 py-2">
        <ul class="flex text-center transition-all duration-200">
            <li :class="{'bg-green-200': view === 'collections'}" @click="view = 'collections'" class="flex-1 border-r border border-slate-400 border-r-slate-400 px-5 py-2 hover:bg-green-300 rounded-l-full">GROUPS</li>
            <li :class="{'bg-green-200': view === 'bank'}" @click="view = 'bank'" class="flex-1 px-5 py-2 border border-slate-400 border-l-0 rounded-r-full hover:bg-green-300">BANKS</li>
        </ul>
    </div>
</template>