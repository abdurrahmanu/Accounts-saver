<script lang="ts" setup>
const accountsCollection = useCollectionStore()
const {toggleCollectionForm} = storeToRefs(accountsCollection)
const {createCollection} = accountsCollection

const accountStore = useAccountStore()
const {accounts, openAccountsDropdown} = storeToRefs(accountStore)

const form = reactive<collectionForm>({
    name: "",
    selectedAccounts: ref(
        Object.assign({}, ...accounts.value.map(account => {
            return {[account.id.toString()]: false}
        }))
    )
})

const successMessage = ref(false)

const submitForm = () => {
    createCollection(form)
    
    if (form.name.length > 0) {
        setTimeout(() => {  
            successMessage.value = true
            form.name = ""
            form.selectedAccounts = ref(
                Object.assign({}, ...accounts.value.map(account => {
                    return {[account.id.toString()]: false}
                }))
            )
        }, 0);
    }

    setTimeout(() => {
        successMessage.value = false
    }, 800);
}
</script>

<template>
    <div class="py-3">        
        <form @submit.prevent="submitForm" class="space-y-3 max-w-120 w-[80%] mx-auto">
            <div>
                <h3 class="font-bold">New Collection</h3>
            </div>
            <div class="space-y-1">
                <label class="block font-medium text-gray-700">Collection Name</label>
                <input v-model="form.name" type="text" required class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border" placeholder="Aliyu Balarabe">
            </div>
            
            <div v-if="accounts.length" class="space-y-1">
                <label class="block text-sm font-medium text-gray-700">Add/Remove Accounts</label>
                <div class="max-h-80 bg-white rounded-md ring ring-slate-300 overflow-y-scroll">
                    <p @click="openAccountsDropdown = !openAccountsDropdown" class="text-center px-10 cursor-pointer py-2 bg-slate-200">Accounts List</p>
                    <AccountSelect 
                    v-for="(account, index) in accounts" :key="index"
                    :account="account" 
                    :toggle="openAccountsDropdown" 
                    v-model="form.selectedAccounts[account.id as keyof object]" />
                </div>
            </div>
            <button type="submit" class="bg-green-300 hover:bg-green-400 rounded-md ring ring-slate-200 px-3 py-2 w-full">Create Collection</button>
            <p v-if="successMessage" class="text-sm text-green-600 text-center font-bold">Collection created!</p>
        </form>
    </div>
</template>