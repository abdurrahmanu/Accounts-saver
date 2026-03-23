<template>
    <div v-if="addNewAccount" class="max-w-160 bg-white px-6 py-2">
      <div class="flex justify-between items-center py-2">
        <h2 class="py-2 text-xl font-bold text-gray-800">{{ formType === 'form' ? 'Add Account' : 'Import Account' }}</h2>
        <div class="text-xs relative h-6 ring-gray-300 flex">
            <div :class="{'bg-green-300' : formType === 'form'}" @click="formType='form'" class="w-fit px-5 py-1 border border-slate-300">FORM</div>
            <div :class="{'bg-green-300' : formType === 'json'}" @click="formType='json'" class="w-fit px-5 py-1 border border-slate-300 border-l-0">JSON</div>
        </div>
      </div>
      
    <div v-if="addNewAccount" >
      <div v-if="formType === 'form'">
        <form @submit.prevent="submitForm" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Full Name</label>
            <input @input="normalizeFormFields('name')" v-model="form.name" type="text" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border" placeholder="Aliyu Balarabe">
          </div>
        
          <div tabindex="-1" ref="focusContainer" @focusout="handleFocusOut" class="relative">
            <label tabindex="0" class="block text-sm font-medium text-gray-700">Bank Name</label>
            <input @input="normalizeFormFields('bank')" tabindex="0" v-model="form.bank" type="text" @focus="showBanksList = true" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border" placeholder="Jaiz Bank">
            <div tabindex="0">
              <BanksList :search-query="form.bank" :toggle="showBanksList" @addBank="form.bank = $event, showBanksList = false" />
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700">Account Number</label>
            <input @input="normalizeFormFields('account')" v-model="form.accountNumber" maxlength="20" type="string" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border" placeholder="0123456789">
          </div>
        
          <div class="p-3 ring ring-teal-600 rounded-md space-y-5">
            <h2 class="font-bold">OPTIONAL FIELDS</h2>
            <div>
              <label class="block text-sm font-medium text-gray-700">Phone Number</label>
              <input @input="normalizeFormFields('phone')" v-model="form.phoneNumber" maxlength="15" type="tel" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border" placeholder="09123456700">
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700">Collection</label>
              <input @input="normalizeFormFields('collection')" v-model="form.collection" type="text" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border" placeholder="company">
            </div>
            
          <div>
            <label class="block text-sm font-medium text-gray-700">Nickname</label>
            <input @input="normalizeFormFields('nickname')" v-model="form.nickname" type="text" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border" placeholder="Plumber">
          </div>
          
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3 py-2">
              <div @click="form.favourite = !form.favourite" class="ring-1 ring-green-500 rounded-sm p-1 flex items-center justify-center">
                <div :class="[form.favourite && 'bg-green-600']" class="rounded-sm p-2"></div>
              </div>
              <span class="text-sm">Add to Favorites</span>
            </div>
          </div>
        </div>
        <div class="flex justify-between items-center">
          <div>
            <p v-if="successMessage" class="text-sm text-green-600 text-center font-bold">Collection created!</p>
            <p v-if="errorMessage" class="text-sm text-red-400 text-center font-bold">Account number Exists</p>
          </div>
          <button type="submit" class="bg-green-300 font-bold py-2 px-4 rounded-md hover:bg-green-400 transition">
            Save Account
          </button>
        </div>
        </form>
      </div>
      <AddAccountJSON v-else />
    </div>
  </div>
</template>

<script setup lang="ts">
interface formFields {
  name: string
  accountNumber: string
  collection: string
  phoneNumber: string
  favourite: boolean
  selected: boolean
  bank: string
  nickname: string
}

const formType = ref('form')
const showBanksList = ref(false)
const successMessage = ref(false)
const errorMessage = ref(false)

const accountStore = useAccountStore()
const {addNewAccount, accounts} = storeToRefs(accountStore)
const {addAccount} = accountStore

const focusContainer = ref<HTMLElement | null>(null)

const handleFocusOut = (event: Event) => {
  if (!focusContainer.value?.contains(event.relatedTarget as Node)) {
    showBanksList.value = false
  }
}

const normalizeFormFields = (field: string | boolean) => {
  let field_ = field as keyof formFields

  let options = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '{', "}", '[', "]", '|', '|', '(', ')', '?', '/', '>', '<', ',', '.', '"', "'", ':', ';', '*', '&', '^', "%", '$', '#', '@', '!', '`', '~', '=']
  if (field === 'account') {
    let lastInput = form.accountNumber[form.accountNumber.length - 1]
    if (lastInput) {
      options.push('-', '+')
      if (!options.includes(lastInput)) form.accountNumber = form.accountNumber.split('').slice(0, -1).join('')
    }
  } else if (field === 'phone') {
    let lastInput = form.phoneNumber[form.phoneNumber.length - 1]
    options.push('+')
      if (!options.includes(lastInput)) form.phoneNumber = form.phoneNumber.split('').slice(0, -1).join('')
  } else if (field === 'name') {
    let lastInput = form.name[form.name.length - 1]
      if (options.includes(lastInput)) form.name = form.name.split('').slice(0, -1).join('')
  } 

  if (typeof form[field_] === 'string') {
    const secondToLastIndex = form[field_][form[field_].length - 2]
    const lastIndex = form[field_][form[field_].length - 1]
    const firstIndex = form[field_][0]

    if (firstIndex === ' ') {
      (form as any)[field_] = form[field_].toString().slice(1) as any
    }

    if (secondToLastIndex === ' ' && lastIndex === ' ')
    (form as any)[field_] = form[field_].toString().slice(0, -1) as any
  }
}

// --- Manual Form Logic ---
const form = reactive<formFields>({ name: '', nickname: '', bank: '', accountNumber: '' , phoneNumber: '', favourite: false, selected: false, collection: ''})

const submitForm = () => {
  const clearForm = () => {
    form.name = ''; form.nickname = '', form.bank = ''; form.phoneNumber = '', form.accountNumber = '', form.favourite = false
  }

  const accountExists = accounts.value.filter(account => account.accountNumber === form.accountNumber)[0]
  
  if (accountExists) {
    errorMessage.value = true
    clearForm()

    setTimeout(() => {
      errorMessage.value = false
    }, 4000);
    return
  }

  addAccount({ ...form })
  successMessage.value = true
  clearForm()
  
  setTimeout(() => {
    successMessage.value = false
  }, 800);
}
</script>