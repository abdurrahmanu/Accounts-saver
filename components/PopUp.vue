<template>
    <div class="flex justify-center items-center">
        <div class="`max-w-125 w-[95%] mx-auto rounded-md space-y-3 bg-slate-100 relative p-10">
            <p @click="toggleDeleteAccountModal = false" class="text-2xl font-mono absolute top-2 right-2 text-black hover:text-black/70 hover:font-bold cursor-pointer">X</p>
            
            <p class="text-center text-black font-medium">
                Are you sure you want to delete 
                <span v-if="isSingle" class="uppercase">{{ singleAccount?.name }}</span>
                <span v-else>these <span class="text-red-700 font-bold">{{ selectedList.length }}</span> {{ view === 'bank' ? 'accounts' : 'collections' }}</span>
            </p>

            <div v-if="isSingle" class="text-center space-y-2">
                <p class="rounded-md w-fit mx-auto">{{ singleAccount?.bank}}</p>
                <p class="rounded-md w-fit mx-auto">{{ singleAccount?.accountNumber}}</p>
            </div>

            <div v-else class="text-center text-sm text-red-700">
                This action cannot be undone.
            </div>

            <div class="flex gap-4 justify-center mt-4">
                <button @click="handleDelete" class="py-1 px-10 rounded-md ring-1 ring-red-400 hover:bg-red-400 transition-colors">YES</button>
                <button @click="toggleDeleteAccountModal = false" class="py-1 px-10 rounded-md ring-1 ring-green-600 hover:bg-green-400 transition-colors">NO</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';

const accountStore = useAccountStore()
const { deleteItem } = accountStore
const { toggleDeleteAccountModal, singleDelete, accounts } = storeToRefs(accountStore)

const collectionStore = useCollectionStore()
const {view} = storeToRefs(collectionStore)

const selectList = useSelectStore()
const { selectedAccounts, selectedList } = storeToRefs(selectList)

const isSingle = computed(() => singleDelete.value || selectedAccounts.value.length === 1)
const singleAccount = computed(() => {
    return isSingle.value ? singleDelete.value && accounts.value.filter(acc => acc.id === singleDelete.value)[0] || selectedAccounts.value[0] : undefined
})

const handleDelete = () => {
    deleteItem(singleDelete.value ? [singleDelete.value] : selectedList.value)
    toggleDeleteAccountModal.value = false
    selectList.cancel() 
}
</script>