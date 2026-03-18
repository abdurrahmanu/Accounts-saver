<template>
    <div class="bg-black/50 fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center">
        <div class="`max-w-125 w-[95%] mx-auto rounded-md space-y-3 bg-slate-100 relative p-10">
            
            <p @click="popUp = false" class="text-2xl font-mono absolute top-2 right-2 text-black hover:text-black/70 hover:font-bold cursor-pointer">X</p>
            
            <p class="text-center text-black font-medium">
                Are you sure you want to delete 
                <span v-if="isSingle">this account?</span>
                <span v-else>these <span class="text-red-700 font-bold">{{ selectedAccounts.length }}</span> accounts?</span>
            </p>

            <div v-if="isSingle" class="text-center">
                <p class="uppercase text-xl font-mono font-bold">{{ singleAccount?.name }} {{ singleAccount?.nickname }}</p>
                <p class="p-2 rounded-md ring-[1px] w-fit mx-auto">{{ singleAccount?.bank}} {{ singleAccount?.accountNumber }}</p>
            </div>

            <div v-else class="text-center text-sm text-red-700">
                This action cannot be undone.
            </div>

            <div class="flex gap-4 justify-center mt-4">
                <button @click="handleDelete" class="py-1 px-10 rounded-md ring-1 ring-red-400 hover:bg-red-400 transition-colors">YES</button>
                <button @click="popUp = false" class="py-1 px-10 rounded-md ring-1 ring-green-600 hover:bg-green-400 transition-colors">NO</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useAccountStore, useSelectListStore, type Account } from '#imports';

const store = useAccountStore()
const { deleteItem } = store
const { popUp } = storeToRefs(store)

const selectList = useSelectListStore()
const { selectedAccounts, selectedList } = storeToRefs(selectList)

const collectionsStore = useAccountsCollection()
const {view} = storeToRefs(collectionsStore)

const isSingle = computed(() => selectedAccounts.value.length === 1)
const singleAccount = computed(() => isSingle.value ? selectedAccounts.value[0] : undefined)

const handleDelete = () => {
    deleteItem(selectedList.value)
    popUp.value = false
    selectList.cancel() 
}
</script>