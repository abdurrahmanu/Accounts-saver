<template>
    <div class="flex justify-center items-center">
        <div class="`max-w-125 w-[95%] mx-auto rounded-md space-y-3 bg-slate-100 relative p-2">            
            <p class="text-center text-black font-medium flex justify-center gap-1">
                <span class="text-red-500">Delete</span> 
                <span v-if="account.length == 1" class="uppercase">{{ account[0]?.name }}</span>
                <div v-else>
                     <span v-if="account.length > 1"> these <span class="text-red-500 font-bold">{{ account.length }}</span> Accounts</span>
                    <span v-else class="text-red-500 font-bold">Account</span>
                </div>
            </p>

            <div v-if="account.length === 1" class="text-center flex w-fit justify-center gap-2 mx-auto">
                <p class="rounded-md w-fit mx-auto">{{ account[0]?.bank}}</p>
                <p class="rounded-md w-fit mx-auto">({{ account[0]?.accountNumber}})</p>
            </div>

            <div class="flex gap-4 justify-center mt-4">
                <button @click="router.back()" class="py-1 px-10 rounded-md ring-1 ring-green-600 hover:bg-green-100 transition-colors">CANCEL</button>
                <button @click="handleDelete" class="py-1 px-10 rounded-md ring-1 ring-red-400 hover:bg-red-100 transition-colors">DELETE</button>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const itemId = computed(() => route.params?.id ? route.params?.id : route.params?.id_ ? route.params.id_ : null)

const accountStore = useAccountStore()
const { deleteItems } = accountStore
const { singleDelete, accounts } = storeToRefs(accountStore)

const selectStore = useSelectStore()
const { selectedList } = storeToRefs(selectStore)

const account = computed<Account[]>(() => {
    if (itemId.value) {
        return accounts.value.filter(acc => acc.id === itemId.value)
    } else {        
        return accounts.value.filter(acc => {
            return selectedList.value.includes(acc.id)
        })
    }
})

const handleDelete = () => {    
    deleteItems(singleDelete.value ? [singleDelete.value] : selectedList.value)
    router.back()
}
</script>