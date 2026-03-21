<template>
    <div class="max-w-160 bg-white px-6 py-2">
      <h2 class="py-2 text-xl font-bold text-gray-800">New Account</h2>
      
      <div v-if="addNewAccount" >
        <form @submit.prevent="submitForm" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Full Name</label>
            <input v-model="form.name" type="text" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border" placeholder="Aliyu Balarabe">
          </div>
          
          <div class="grid grid-cols-2 gap-4">
            <div class="relative">
              <label class="block text-sm font-medium text-gray-700">Bank Name</label>
              <input v-model="form.bank" type="text" @focus="showBanksList = !showBanksList" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border" placeholder="Jaiz Bank">
              <BanksList :search-query="form.bank" :toggle="showBanksList" @addBank="form.bank = $event, showBanksList = false" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Account Number</label>
              <input v-model="form.accountNumber" type="text" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border" placeholder="0123456789">
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Nickname (Optional)</label>
            <input v-model="form.nickname" type="text" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border" placeholder="Plumber">
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Phone Number (optional)</label>
            <input v-model="form.phoneNumber" type="text" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border" placeholder="09123456700">
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Collection (optional)</label>
            <input v-model="form.collection" type="text" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border" placeholder="company">
          </div>

          <div class="flex items-center space-x-3 py-2">
            <div @click="form.favourite = !form.favourite" class="ring-1 ring-green-500 rounded-sm p-1 flex items-center justify-center">
              <div :class="[form.favourite && 'bg-green-600']" class="rounded-sm p-2"></div>
            </div>
            <span class="text-sm">Add to Favorites</span>
          </div>

          <button type="submit" class="w-full bg-green-300 font-bold py-2 px-4 rounded-md hover:bg-green-400 transition">
            Save Single Account
          </button>
          <p v-if="successMessage" class="text-sm text-green-600 text-center font-bold">Collection created!</p>
          <p v-if="errorMessage" class="text-sm text-red-400 text-center font-bold">Account number Exists</p>
        </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

const showBanksList = ref(false)
const successMessage = ref(false)
const errorMessage = ref(false)

const accountStore = useAccountStore()
const {addNewAccount, accounts} = storeToRefs(accountStore)
const {addAccount} = accountStore

// --- Manual Form Logic ---
const form = reactive({ name: '', nickname: '', bank: '', accountNumber: '' , phoneNumber: '', favourite: false, selected: false, collection: ''})

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