<template>
    <div class="w-[90%] max-w-130 space-y-3 text-sm mx-auto">
        <h2 class="font-bold text-base">EDIT ACCOUNT</h2>
        <div v-for="(value, property, index) in reducedAccount" :key="index" class="space-y-1">
            <div class="font-medium text-gray-700 flex items-center justify-between gap-3 ring ring-slate-400 rounded-md">
                <div class="flex items-center justify-stretch gap-2">
                    <p class="uppercase px-3 py-1 bg-slate-200 rounded-l-md">{{ labels[property] }}:</p>
                    <div>
                        <input v-if="showInput[property]" v-model="form[property]" type="text" class="inline-block h-full outline-none appearance-none w-full" :placeholder="placeholders[property]">
                        <span v-else class="capitalize">{{ value }}</span>
                    </div>
                </div>
                
                <div>
                    <img v-if="!showInput[property]" @click="editAccount(property)" src="/edit.svg" alt="" class="w-5">
                    <img v-else @click="editAccount(property)" src="/cancel.svg" alt="" class="w-5">
                </div>
            </div>
        </div>

        <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3 py-1">
                <div @click="form.favourite = !form.favourite" class="ring-1 ring-green-500 rounded-sm p-1 flex items-center justify-center">
                    <div :class="[form.favourite && 'bg-green-600']" class="rounded-sm p-2"></div>
                </div>
                <span class="text-sm">Add to Favorites</span>
            </div>
            <div class="space-x-2">
                <button @click="toggleAppModal = false" class="ring px-5 py-1 bg-red-300 hover:bg-red-300 ring-slate-300 rounded-md">CLOSE</button>
                <button v-if="requiredFieldNotEmpty" @click="save()" class="ring px-5 py-1 bg-green-300 hover:bg-green-300 ring-slate-300 rounded-md">SAVE</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const accountStore = useAccountStore()
const {toggleAppModal} = storeToRefs(accountStore)
const {addAccount} = accountStore

interface FieldsToggle {
    name: boolean
    nickname: boolean
    bank: boolean
    accountNumber: boolean
    phoneNumber: boolean
    collection: boolean
}

interface FormInterface {
    name: string
    nickname: string
    bank: string
    accountNumber: string
    phoneNumber: string
    favourite: boolean
    collection: string
}

const props = defineProps<{
    account: Account
}>()

const reducedAccount = computed(() => {    
    const {id, favourite, selected, ...rest} = props.account
    return rest
})

const requiredFieldNotEmpty = computed(() => {
    const {collection, phoneNumber, nickname} = form
    const required = {collection, phoneNumber, nickname}
    return Object.values(required).some(value => value)
})

const form = reactive({ name: '', nickname: '', bank: '', accountNumber: '' , phoneNumber: '', favourite: false, collection: ''})

const placeholders = { name: 'Aliyu Musa', nickname: 'MTM', bank: 'Access Bank', accountNumber: '0123456789' , phoneNumber: '081234567', collection: 'Friend'}

const labels = { name: 'Full Name', nickname: 'nickname', bank: 'bank', accountNumber: 'Account Number' , phoneNumber: 'Phone Number', collection: 'Collection'}

const showInput = reactive<FieldsToggle>({ name: false, nickname: false, bank: false, accountNumber: false , phoneNumber: false, collection: false})

const save = (property?: string) => {    
    let value = form[property as keyof FormInterface]
    let saveAll = !value && !property

    if (saveAll) {
        for (const key in form) {
            let val = form[key as keyof FormInterface]
            if (val) addAccount(props.account, props.account.id, key, val)
            showInput[key as keyof Fieldstoggle] = false
            toggleAppModal.value = false
        }
        return
    }

    addAccount(props.account, props.account.id, property, value)
}

const editAccount = (property?: string) => {
    if (property) {
        if (showInput[property as keyof FieldsToggle]) {
            let value = form[property as keyof FormInterface]
            if (value) {
                save(property)
            }
        }
        
        showInput[property as keyof FieldsToggle] = !showInput[property as keyof FieldsToggle]
    }
}
</script>