<script lang="ts" setup>
const accountsCollection = useAccountsCollection()
const {view} = storeToRefs(accountsCollection)
</script>

<template>
    <div class="px-5 py-7">
        <ul class="flex text-center gap-3 transition-all duration-200">
            <li :class="{'bg-blue-300 hover:bg-blue-300': view === 'collections'}" @click="view = 'collections'" class="rounded-lg flex-1 border-r border border-slate-400 px-5 py-3 hover:bg-blue-200">GROUPS</li>
            <li :class="{'bg-blue-300 hover:bg-blue-300': view === 'bank'}" @click="view = 'bank'" class="rounded-lg flex-1 px-5 py-3 border border-slate-400  hover:bg-blue-200">BANKS</li>
        </ul>
    </div>
</template>