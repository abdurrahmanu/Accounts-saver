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
              <ul v-if="showBanksList" class="max-h-40 w-full absolute z-2 bg-white ring ring-slate-300 rounded-md px-1 overflow-y-scroll">
                <li @click="form.bank = bank, showBanksList = !showBanksList" v-for="(bank, index) in filteredBanks || banksList" :key="index" class="hover:bg-slate-200 transition-all duration-100 p-1 z-3">{{bank}}</li>
              </ul>
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

          <div class="flex items-center space-x-3 py-2">
            <input type="radio" class="appearance-none rounded-md p-2 border-2">
            <span class="text-sm">Add to Favorites</span>
          </div>

          <button type="submit" class="w-full bg-green-300 font-bold py-2 px-4 rounded-md hover:bg-green-400 transition">
            Save Single Account
          </button>
          <p v-if="successMessage" class="text-sm text-green-600 text-center font-bold">Collection created!</p>
        </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

const successMessage = ref(false)

const accountStore = useAccountStore()
const {addNewAccount} = storeToRefs(accountStore)
const {addAccount} = accountStore

// --- Manual Form Logic ---
const form = reactive({ name: '', nickname: '', bank: '', accountNumber: '' , phoneNumber: '', favourite: false, selected: false, collection: ''})

const banksList = ref([
  'Access Bank Plc', 'UBA United Bank for Africa', 'Zenith Bank Plc', 'GTBank Guarantee Trust Holding Company GTCO', 'First Bank', 'Opay', 'Palmpay', 'Kuda Bank', 'Fidelity Bank', 'Ecobank', 'FCMB First City Monument Bank', 'MoniePoint', 'Polaris Bank', 'Keystone Bank', 'Providus Bank', 'Titan Trust Bank', 'Unity Bank', 'Standard Chartered Bank', 'Globus Bank', 'Parallex Bank', 'Jaiz Bank', 'Premium Trust Bank', 'Sterling Bank', 'Stanbic IBTC', 'Lotus Bank', 'Signature Bank', 'Alternative Bank (AltBank)', 'SunTrust Bank'
])

const filteredBanks = computed(() => {
  return banksList.value.filter(bank => bank.toLowerCase().includes(form.bank.toLowerCase()))
})

const showBanksList = ref(false)

const submitForm = () => {
  addAccount({ ...form })
  successMessage.value = true
  form.name = ''; form.nickname = '', form.bank = ''; form.phoneNumber = '', form.accountNumber = '', form.favourite = false
  
  setTimeout(() => {
    successMessage.value = false
  }, 800);
}
</script>