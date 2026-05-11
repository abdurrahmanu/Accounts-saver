<template>
    <div class="relative flex justify-between w-full group max-w-screen">
      
      <div 
        :class="{
          'bg-green-50/50 hover:bg-green-50': selectedList.includes(account.id),
          'hover:bg-slate-50': !selectedList.includes(account.id),
          'border-l-green-500': account.favourite,
          'border-l-transparent': !account.favourite
        }"
        @pointerdown="start($event, account.id)" 
        @pointerup="stop($event, account.id)" 
        @pointercancel="stop($event, account.id)"
        class="text-xs border-y border-y-slate-200 transition-colors flex-1 min-w-0 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative border-l-[6px] cursor-pointer">
        
        <div class="flex gap-3 w-full p-3 pl-2 items-center min-w-0">
          <!-- Selection & Avatar -->
          <div class="flex items-center gap-3">
            <div v-if="ongoingSelection" class="flex justify-center w-5">
              <SvgChecked v-if="selectedList.includes(account.id)" class="w-5 text-green-600" />
              <SvgUnchecked v-else class="w-5 text-slate-300" alt=""/>
            </div>
            
            <!-- Upgraded Avatar -->
            <div class="w-11 h-11 rounded-full bg-green-100 border border-green-200 flex items-center justify-center shrink-0">
              <p class="text-lg font-bold uppercase text-green-800 tracking-wide">
                <span v-for="(initial, index) in nameInitials" :key="index">{{ initial }}</span>
              </p>
            </div>
          </div>
          
          <!-- Details & Descriptive Pills -->
          <div class="space-y-1.5 w-full min-w-0">
            <!-- Name & Nickname -->
            <h4 class="font-semibold text-slate-800 uppercase text-sm truncate">
              {{ account.name }} 
              <span v-if="account.nickname" class="text-slate-500 font-medium text-xs normal-case ml-1">
                ({{ account.nickname }})
              </span>
            </h4>
            
            <!-- The overflow-x-scroll will now work perfectly here! -->
            <div class="flex items-center gap-2 overflow-x-scroll w-full custom-scrollbar py-2">
              <!-- Bank -->
              <div v-if="selectedBank === 'all'" class="flex gap-2 items-center bg-blue-100 border border-blue-100/60 rounded px-1.5 py-0.5">
                <!-- <span class="text-[9px] uppercase tracking-wider font-bold text-blue-400 mr-1.5">Bank</span> -->
                <span class="text-xs font-medium whitespace-nowrap text-blue-700">{{ account.bank }}</span>
                <button @click="copyToClipboard('bank')" class="p-1.5 rounded-md transition-colors hover:bg-slate-200 focus:outline-none flex items-center justify-center">
                  <SvgCopied v-if="copied === 'bank'" class="w-5 h-5 text-green-500" src="/copied.svg" />
                  <SvgCopy v-else class="w-5 h-5 text-slate-500" src="/tocopy.svg" />
                </button>
              </div>
              
              <!-- Account Number -->
              <div class="flex items-center gap-2 bg-teal-100 border border-slate-200 rounded px-1.5 py-0.5">
                <span class="text-[9px] uppercase tracking-wider font-bold text-slate-400 mr-1.5">A/C</span>
                <span class="text-xs font-mono font-medium text-slate-700">{{ account.accountNumber }}</span>
                <button @click="copyToClipboard('accountNumber')" class="p-1.5 rounded-md transition-colors hover:bg-slate-200 focus:outline-none flex items-center justify-center">
                  <SvgCopied v-if="copied === 'accountNumber'" class="w-5 h-5 text-green-500" src="/copied.svg" />
                  <SvgCopy v-else class="w-5 h-5 text-slate-500" src="/tocopy.svg" />
                </button>
              </div>
            
              <!-- Phone Number -->
              <div v-if="account.phoneNumber" class="flex items-center gap-2 bg-emerald-100 border border-emerald-100/60 rounded px-1.5 py-0.5">
                <span class="text-[9px] uppercase tracking-wider font-bold text-emerald-400 mr-1.5">Tel</span>
                <span class="text-xs font-mono font-medium text-emerald-700">{{ account.phoneNumber }}</span>
                <button @click="copyToClipboard('phone')" class="p-1.5 rounded-md transition-colors hover:bg-slate-200 focus:outline-none flex items-center justify-center">
                  <SvgCopied v-if="copied === 'phone'" class="w-5 h-5 text-green-500" src="/copied.svg" />
                  <SvgCopy v-else class="w-5 h-5 text-slate-500" src="/tocopy.svg" />
              </button>
              </div>    
              
              <!-- Collection -->
              <div v-if="account.collection" class="flex items-center gap-2 bg-fuchsia-100 border border-purple-100/60 rounded px-1.5 py-0.5">
                <span class="text-[9px] uppercase tracking-wider font-bold text-purple-400 mr-1.5">Col</span>
                <span class="text-xs font-mono font-medium text-purple-700">{{ account.collection }}</span>
                <button @click="copyToClipboard('collection')" class="p-1.5 rounded-md transition-colors hover:bg-slate-200 focus:outline-none flex items-center justify-center">
                  <SvgCopied v-if="copied === 'collection'" class="w-5 h-5 text-green-500" src="/copied.svg" />
                  <SvgCopy v-else class="w-5 h-5 text-slate-500" src="/tocopy.svg" />
                </button>
              </div>
            
            </div>
          </div>
        </div> 
      </div>

      <!-- RIGHT SIDE: Actions Menu -->
      <div class="bg-slate-50 select-none border-y border-y-slate-200 border-l border-l-slate-200 flex items-center px-1.5 shrink-0 gap-1">
        
        <button @click="copyToClipboard('full')" class="p-1.5 rounded-md transition-colors hover:bg-slate-200 focus:outline-none flex items-center justify-center">
          <SvgCopied v-if="copied === 'full'" class="w-5 h-5 text-green-500" src="/copied.svg" />
          <SvgCopy v-else class="w-5 h-5 text-slate-500" src="/tocopy.svg" />
        </button>

        <div v-if="multiSelect" class="flex items-center">
          <button 
            v-if="selectedAccountId === account.id"
            @click="closePopUp" 
            :class="[selectedAccountId === account.id ? 'bg-red-100 text-red-600 hover:bg-red-200' : 'text-slate-500 hover:bg-slate-200']" 
            class="p-1.5 rounded-md transition-colors focus:outline-none flex items-center justify-center">
            <SvgCancel @click="goBack" class="w-5 h-5" />
          </button>
          <button 
            v-else
            id="toggle-popup"
            @click="openPopUp" 
            :class="[selectedAccountId === account.id ? 'bg-red-100 text-red-600 hover:bg-red-200' : 'text-slate-500 hover:bg-slate-200']" 
            class="p-1.5 rounded-md transition-colors focus:outline-none flex items-center justify-center">
            <SvgMore id="toggle-popup" class="w-5 h-5" />
          </button>
        </div>

        <div v-if="selectedAccountId === account.id" class="absolute right-0 top-full z-10">
          <AccountItemPopUp />
        </div>
      </div>
      
    </div>
</template>

<script setup lang="ts">
const route = useRoute()
const router = useRouter()

const selectStore = useSelectStore()
const {selectedList, ongoingSelection, selectedAccountId } = storeToRefs(selectStore)
const {start, stop} = selectStore

const accountStore = useAccountStore()
const {selectedBank,  } = storeToRefs(accountStore)

const props = defineProps<{
  account: Account,
}>()

const copied = ref('')

const copyToClipboard = async (copy?: string) => {
  let textValue: string
  if (copy === 'bank') textValue = props.account.bank
  else if (copy === 'phone') textValue = props.account.phoneNumber
  else if (copy === 'accountNumber') textValue = props.account.accountNumber
  else if (copy === 'collection') textValue = props.account.collection
  else textValue = `Account Name: ${props.account.name}\nAccount Number: ${props.account.accountNumber}\nBank Name: ${props.account.bank}`

  try {
    await navigator.clipboard.writeText(textValue)
    copied.value = copy as string
    setTimeout(() => {
      copied.value = ''
    }, 2000)
  } catch (err) {
    console.error('Failed to copy text: ', err)
  }
}

const multiSelect = computed(() => {
  return selectedList.value.length && selectedList.value.includes(props.account.id)
})

const goBack = () => {
  selectedAccountId.value = ''
}

const closePopUp = () => {
  selectedAccountId.value = ''
  router.back()
}

const openPopUp = () => {
  let lastIndexOfSlash = route.fullPath.lastIndexOf('/')
  let prevSelectId = route.fullPath.slice(lastIndexOfSlash + 1)
  let correctedRoute = route.fullPath.slice(0, lastIndexOfSlash)
  
  if (selectedAccountId.value) {
    selectedAccountId.value = props.account.id
    navigateTo(correctedRoute + `/${selectedAccountId.value}`)
  } else {
    selectedAccountId.value = props.account.id
    navigateTo(route.fullPath + `/${selectedAccountId.value}`)
  }
}

const nameInitials = computed(() => {
  let initials = []
  let dividedName = props.account.name.split(' ')
  if (dividedName.length > 1) {
    initials.push(dividedName[0].slice(0,1))
    initials.push(dividedName[1].slice(0,1))
  } 
  else initials.push(dividedName[0].slice(0,1))

  return initials
})
</script>