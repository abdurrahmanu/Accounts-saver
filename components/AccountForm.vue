<template>
  <div class="border-y border-slate-300">    
    <div class="bg-white p-6 py-2 bspace-y-6">
      
      <div class="flex justify-between items-center py-2">
        <h2 class="text-xl font-bold text-gray-800">{{ addNewAccount ? 'New Account' : '' }}</h2>
        <p @click="addNewAccount = !addNewAccount" class="cursor-pointer flex justify-self-end ring rounded-md hover:bg-zinc-200 w-fit px-5 gap-1 h-fit py-1">{{ addNewAccount ? 'Close Form' : 'Add New Account' }}</p>
      </div>
      
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
        </form>

      <hr class="border-gray-200" />

      <div class="pt-5">
        <div>
          <div class="flex items-center justify-between space-x-3 text-sm">
          <h3 class="text-lg font-bold mb-2 text-gray-800">Import Accounts</h3>
          <div 
          @click.self="toggleJSONForm = !toggleJSONForm" 
          class="my-1 w-19 relative h-6 rounded-full ring ring-gray-300 flex">
          <div 
          :class="{
            'absolute right-0 bg-green-400' : toggleJSONForm,
            'relative bg-slate-400': !toggleJSONForm
          }" 
            class="px-5 h-0 py-3 rounded-full transition-all duration-150"></div>
          </div>
        </div>

        <div v-if="toggleJSONForm">
          <p class="text-sm text-gray-500 mb-3">Paste accounts in JSON format</p>
          
          <textarea 
          v-model="bulkJsonText" 
          rows="4" 
          class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border font-mono text-xs bg-gray-50"
          placeholder='[ { "name": "Ibrahim Yakubu", "bank": "Jaiz Bank", "accountNumber": "123233" }, { "name": "Abdu Zarewa", "bank": "GTB", "accountNumber": "123345" } ]'
          ></textarea>
          
          <button 
          @click="handlePastedJson" 
          class="mt-2 w-full bg-gray-800 text-white font-bold py-2 px-4 rounded-md hover:bg-black transition text-sm"
          >
          Import Pasted JSON
        </button>
        
        <div class="py-4 space-y-2">
          <div class="text-sm text-gray-500 font-medium">Upload a json file:</div>
          <div class="flex items-center">
            <input 
            type="file" 
            accept="application/json" 
            @change="handleFileUpload" 
            ref="fileInput"
            class="text-sm text-gray-500 file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 cursor-pointer"
            >
          </div>
        </div>
        
        <p v-if="importMessage" :class="importSuccess ? 'text-green-600' : 'text-red-600'" class="text-sm mt-3 font-medium text-center p-2 rounded bg-gray-50">
          {{ importMessage }}
        </p>
      </div>
      </div>
      </div>
    </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useAccountStore } from '~/stores/useAccountStore'

const toggleJSONForm = ref(false)

const accountStore = useAccountStore()
const {addNewAccount} = storeToRefs(accountStore)

// --- Manual Form Logic ---
const form = reactive({ name: '', nickname: '', bank: '', accountNumber: '' , phoneNumber: '', favourite: false, selected: false})

const banksList = ref([
  'Access Bank Plc', 'UBA United Bank for Africa', 'Zenith Bank Plc', 'GTBank Guarantee Trust Holding Company GTCO', 'First Bank', 'Opay', 'Palmpay', 'Kuda Bank', 'Fidelity Bank', 'Ecobank', 'FCMB First City Monument Bank', 'MoniePoint', 'Polaris Bank', 'Keystone Bank', 'Providus Bank', 'Titan Trust Bank', 'Unity Bank', 'Standard Chartered Bank', 'Globus Bank', 'Parallex Bank', 'Jaiz Bank', 'Premium Trust Bank', 'Sterling Bank', 'Stanbic IBTC', 'Lotus Bank', 'Signature Bank', 'Alternative Bank (AltBank)', 'SunTrust Bank'
])

const filteredBanks = computed(() => {
  return banksList.value.filter(bank => bank.toLowerCase().includes(form.bank.toLowerCase()))
})

const showBanksList = ref(false)
const store = useAccountStore()

const submitForm = () => {
  store.addAccount({ ...form })
  form.name = ''; form.nickname = ''; form.bank = ''; form.phoneNumber = '', form.accountNumber = '', form.selected = false, form.favourite = false
}

// --- Bulk Import Logic (Shared) ---
const importMessage = ref('')
const importSuccess = ref(true)

const processJsonArray = (parsedData: any) => {
  if (!Array.isArray(parsedData)) throw new Error("JSON must be an array [ ... ]")
  
  let addedCount = 0
  parsedData.forEach((item: any) => {
    if (item.name && item.bank && item.accountNumber) {
      store.addAccount({
        name: item.name,
        nickname: item.nickname || '',
        bank: item.bank,
        accountNumber: String(item.accountNumber),
        favourite: item.favourite,
        phoneNumber: item.phoneNumber,
        selected: item.selected,
      })
      addedCount++
    }
  })
  
  importSuccess.value = true
  importMessage.value = `Successfully imported ${addedCount} accounts!`
  setTimeout(() => { importMessage.value = '' }, 4000)
}

// --- Paste JSON Logic ---
const bulkJsonText = ref('')

const handlePastedJson = () => {
  if (!bulkJsonText.value.trim()) return
  try {
    const parsedData = JSON.parse(bulkJsonText.value)
    processJsonArray(parsedData)
    bulkJsonText.value = '' // Clear textarea on success
  } catch (error: any) {
    importSuccess.value = false
    importMessage.value = "Error: Invalid JSON format. Check your syntax."
  }
}

// --- File Upload Logic ---
const fileInput = ref<HTMLInputElement | null>(null)

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = (e) => {
    try {
      const result = e.target?.result
      if (typeof result === 'string') {
        processJsonArray(JSON.parse(result))
        if (fileInput.value) fileInput.value.value = '' // Reset file input
      }
    } catch (error: any) {
      importSuccess.value = false
      importMessage.value = "Error: Invalid JSON file."
    }
  }
  reader.readAsText(file)
}
</script>