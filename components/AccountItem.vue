<template>
    <div class="relative flex justify-between bg-white group">
      
      <!-- LEFT SIDE: Main Pressable Content -->
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
        class="text-xs border-y border-y-slate-200 transition-colors flex-1 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative border-l-[6px] cursor-pointer"
      >
        <div class="flex gap-3 w-full p-3 pl-2 items-center">
          
          <!-- Selection & Avatar -->
          <div class="flex items-center gap-3 shrink-0">
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
            
            <!-- Labeled Data Pills Container -->
            <div class="space-y-2">
              <div class="flex gap-2 items-center">
                <!-- Bank -->
                <div v-if="selectedBank === 'all'" class="flex items-center bg-blue-100 border border-blue-100/60 rounded px-1.5 py-0.5">
                  <!-- <span class="text-[9px] uppercase tracking-wider font-bold text-blue-400 mr-1.5">Bank</span> -->
                  <span class="text-xs font-medium text-blue-700">{{ account.bank }}</span>
                </div>
                
                <!-- Account Number -->
                <div class="flex items-center bg-teal-100 border border-slate-200 rounded px-1.5 py-0.5">
                  <span class="text-[9px] uppercase tracking-wider font-bold text-slate-400 mr-1.5">A/C</span>
                  <span class="text-xs font-mono font-medium text-slate-700">{{ account.accountNumber }}</span>
                </div>
              </div>
              
              <div class="flex gap-2 items-center">
                <div v-if="(account.phoneNumber || account.collection)" class="flex gap-2 flex-wrap">
                  <!-- Collection -->
                  <div v-if="account.collection" class="flex items-center bg-fuchsia-100 border border-purple-100/60 rounded px-1.5 py-0.5">
                    <span class="text-[9px] uppercase tracking-wider font-bold text-purple-400 mr-1.5">Col</span>
                    <span class="text-xs font-mono font-medium text-purple-700">{{ account.collection }}</span>
                  </div>
                  
                  <!-- Phone Number -->
                  <div v-if="account.phoneNumber" class="flex items-center bg-emerald-100 border border-emerald-100/60 rounded px-1.5 py-0.5">
                    <span class="text-[9px] uppercase tracking-wider font-bold text-emerald-400 mr-1.5">Tel</span>
                    <span class="text-xs font-mono font-medium text-emerald-700">{{ account.phoneNumber }}</span>
                  </div>
                </div>
              </div>

              {{ selectedAccountId }}-----{{ account.id }}
            </div>
          </div>
        </div> 
      </div>

      <!-- RIGHT SIDE: Actions Menu -->
      <div class="bg-slate-50 select-none border-y border-y-slate-200 border-l border-l-slate-200 flex items-center px-1.5 shrink-0 gap-1">
        
        <button @click="copyToClipboard" class="p-1.5 rounded-md transition-colors hover:bg-slate-200 focus:outline-none flex items-center justify-center">
          <SvgCopy v-if="!copied" class="w-5 h-5 text-slate-500" src="/tocopy.svg" />
          <SvgCopied v-else class="w-5 h-5 text-green-500" src="/copied.svg" />
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
            @click="openPopUp" 
            :class="[selectedAccountId === account.id ? 'bg-red-100 text-red-600 hover:bg-red-200' : 'text-slate-500 hover:bg-slate-200']" 
            class="p-1.5 rounded-md transition-colors focus:outline-none flex items-center justify-center">
            <SvgMore class="w-5 h-5" />
          </button>
        </div>

        <div :id="selectedAccountId === account.id ? 'selection' : 'no-selection'" v-if="selectedAccountId === account.id" class="absolute right-0 top-full z-10">
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

const copied = ref(false)

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(props.account.accountNumber)
    copied.value = true
    setTimeout(() => {
      copied.value = false
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