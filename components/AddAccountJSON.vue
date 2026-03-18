<template>
    <div class="py-2 px-6">
        <div class="flex items-center justify-between space-x-3 text-sm">
          <h3 class="text-lg font-bold mb-2 text-gray-800">Import Accounts</h3>
          <div 
          @click="toggleJSONForm = !toggleJSONForm" 
          class="my-1 w-17 relative h-6 rounded-full ring ring-gray-300 flex">
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
        <p v-if="errorMessage" class="text-sm text-red-300 mt-3 font-medium text-center p-2 rounded bg-gray-50">
          Some accounts already exist
        </p>
      </div>
    </div>
</template>

<script lang="ts" setup>
const accountStore = useAccountStore()
const {accounts} = storeToRefs(accountStore)  
const {addAccount} = accountStore

const toggleJSONForm = ref(false)
// --- Bulk Import Logic (Shared) ---
const importMessage = ref('')
const importSuccess = ref(true)
const errorMessage = ref(false)

const processJsonArray = (parsedData: any) => {
  if (!Array.isArray(parsedData)) throw new Error("JSON must be an array [ ... ]")
  
  let addedCount = 0
  parsedData.forEach((item: any) => {
    if (item.name && item.bank && item.accountNumber) {
      const accountExists = accounts.value.filter(account => account.accountNumber === item.accountNumber)[0]
      if (accountExists) {
        errorMessage.value = true
        return
      }

      addAccount({
        name: item.name,
        nickname: item.nickname || '',
        bank: item.bank,
        accountNumber: String(item.accountNumber),
        favourite: item.favourite,
        phoneNumber: item.phoneNumber,
        selected: item.selected,
        collection: item.collection
      })
      addedCount++
    }
  })
  
  importSuccess.value = true
  importMessage.value = `Successfully imported ${addedCount} accounts!`
  setTimeout(() => { importMessage.value = '', errorMessage.value = false }, 1000)
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