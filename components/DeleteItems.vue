<template>
    <div class="flex justify-center items-center">
        <div class="`max-w-125 w-[95%] mx-auto rounded-md space-y-5 bg-slate-100 relative p-2">            
            <p class="text-center text-black font-medium flex justify-center gap-1">
                Delete 
                <span v-if="itemId" class="uppercase">{{ account?.name }}</span>
                <div v-else>
                     <span v-if="selectedList.length > 1"> these <span class="text-red-700 font-bold">{{ selectedList.length }}</span> {{ view === 'bank' ? 'accounts' : 'collections' }}</span>
                    <span v-else class="text-red-700 font-bold">Single {{ view === 'bank' ? 'account' : 'collection' }}</span>
                </div>
            </p>

            <div v-if="itemId" class="text-center space-y-2">
                <p class="rounded-md w-fit mx-auto">{{ account?.bank}}</p>
                <p class="rounded-md w-fit mx-auto">{{ account?.accountNumber}}</p>
            </div>

            <div class="flex gap-4 justify-center mt-4">
                <button @click="router.back()" class="py-1 px-10 rounded-md ring-1 ring-green-600 hover:bg-green-400 transition-colors">CANCEL</button>
                <button @click="handleDelete" class="py-1 px-10 rounded-md ring-1 ring-red-400 hover:bg-red-400 transition-colors">DELETE</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const itemId = computed(() => route.params.id)

const accountStore = useAccountStore()
const { deleteItems } = accountStore
const { singleDelete, accounts } = storeToRefs(accountStore)

const collectionStore = useCollectionStore()
const {view} = storeToRefs(collectionStore)

const selectList = useSelectStore()
const { selectedList } = storeToRefs(selectList)

const account = computed<Account>(() => {
  return accounts.value.filter(acc => acc.id === itemId.value)[0]
})

const handleDelete = () => {    
    deleteItems(singleDelete.value ? [singleDelete.value] : selectedList.value)
    router.back()
    router.back()
}
</script>