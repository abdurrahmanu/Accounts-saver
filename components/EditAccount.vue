<template>
    <div class="w-[90%] max-w-130 space-y-3 text-sm mx-auto">
        <h2 class="font-bold text-base">EDIT ACCOUNT</h2>
        <div v-for="(property, value, index) in reducedAccount" :key="index" class="space-y-1">
            <div class="font-medium text-xs text-gray-700 flex items-center justify-between gap-3 ring ring-slate-400 rounded-md">
                <div class="flex items-center justify-stretch gap-2">
                    <p class="uppercase px-3 py-1 bg-slate-200 rounded-l-md">{{ labels[value] }}:</p>
                    <div>
                        <input v-model="form[value]" :required="requiredFields.includes(property)" type="text" class="inline-block h-full outline-none appearance-none w-full" :placeholder="placeholders[value]">
                    </div>
                </div>
            </div>
        </div>
        
        <form @submit.prevent="editAccount" class="flex items-center justify-between">
            <div class="flex items-center space-x-3 py-1">
                <div @click="form.favourite = !form.favourite" class="ring-1 ring-green-500 rounded-sm p-1 flex items-center justify-center">
                    <div :class="[form.favourite && 'bg-green-600']" class="rounded-sm p-2"></div>
                </div>
                <span class="text-sm">Add to Favorites</span>
            </div>
            <div class="space-x-2">
                <button @click="toggleEditAccountModal = false" class="ring px-5 py-1 bg-red-300 hover:bg-red-300 ring-slate-300 rounded-md">CLOSE</button>
                <button v-if="formIsChanged" type="submit" class="ring px-5 py-1 bg-green-300 hover:bg-green-300 ring-slate-300 rounded-md">SAVE</button>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
const accountStore = useAccountStore()
const {toggleEditAccountModal, singleEdit, accounts} = storeToRefs(accountStore)
const {addAccount} = accountStore

interface FormFieldInterface {
    name: string | boolean
    nickname: string | boolean
    bank: string | boolean
    accountNumber: string | boolean
    phoneNumber: string | boolean
    favourite?: boolean
    collection: string | boolean  
}

const account = accounts.value.filter(acc => acc.id === singleEdit.value)[0]

const requiredFields = ['name', 'accountName', 'bank']

const reducedAccount = computed(() => {    
    const {favourite, selected, id, ...rest} = account    
    return rest
})

const requiredFieldIsEmpty = computed(() => {
    const {collection, phoneNumber, nickname, favourite, ...rest} = form
    const required = rest
    
    return Object.values(required).some(value => !value)
})

const readOnlyForm = {
    name: account.name, 
    nickname: account.nickname, 
    bank: account.bank, 
    accountNumber: account.accountNumber, 
    phoneNumber: account.phoneNumber, 
    favourite: account.favourite, 
    collection: account.collection
}

const form = reactive({ 
    name: account.name, 
    nickname: account.nickname, 
    bank: account.bank, 
    accountNumber: account.accountNumber, 
    phoneNumber: account.phoneNumber, 
    collection: account.collection,
    favourite: account.favourite, 
})

const placeholders = { name: 'Aliyu Musa', nickname: 'MTM', bank: 'Access Bank', accountNumber: '0123456789' , phoneNumber: '081234567', collection: 'Friend'}

const labels = { name: 'Full Name', nickname: 'nickname', bank: 'bank', accountNumber: 'Account Number' , phoneNumber: 'Phone Number', collection: 'Collection'}

const editAccount = () => {    
    if (requiredFieldIsEmpty.value) return

    addAccount({
        name: form.name,
        nickname: form.nickname || '',
        bank: form.bank,
        accountNumber: String(form.accountNumber),
        phoneNumber: form.phoneNumber,
        favourite: form.favourite,
        collection: form.collection,
        selected: false,
    }, account.id)

    toggleEditAccountModal.value = false        
}

const formIsChanged = computed(() => {
    return Object.entries(readOnlyForm).some(field => {
        if (typeof field[1] === 'string' && typeof form[field[0] as keyof FormFieldInterface] === 'string') {                        
            return field[1] !== form[field[0] as keyof FormFieldInterface].toString().trim()
    
        }
        else return field[1] !== form[field[0] as keyof FormFieldInterface]
    })
})
</script>