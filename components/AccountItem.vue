<template>
    <div class="relative flex justify-between">
      <div :class="{
        'bg-black/10 hover:bg-black/10': selectedList.includes(account.id),
        'hover:bg-black/20': !selectedList.includes(account.id),
        'border-l-green-500': account.favourite,
        'border-l-transparent': !account.favourite
      }"
    @pointerdown="start($event, account.id)" 
    @pointerup="stop($event, account.id)" 
    @pointercancel="stop($event, account.id)"
    class="text-xs border-y border-y-gray-300 transition flex-1 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative border-l-6">
        <div class="flex gap-2 w-full py-2 px-4 pl-2 items-center">
          <div class="flex items-center space-x-2">
            <div v-if="ongoingSelection">
              <SvgChecked v-if="selectedList.includes(account.id)" class="w-5" />
              <SvgUnchecked v-else class="w-5" alt=""/>
            </div>
            <div v-if="seeMore === account.id" class="rounded-full p-2 ring ring-green-500 flex">
              <p v-for="(initial, index) in nameInitials" :key="index" class="text-2xl font-bold uppercase">{{ initial }}</p>
            </div>
          </div>
          <div class="space-y-1 w-full">
            <h4 class="font-medium text-gray-800 uppercase">{{ account.name }} <span v-if="account.nickname" class="text-gray-500 font-normal text-sm">({{ account.nickname }})</span></h4>
            <div class="flex gap-2 flex-wrap">
              <p v-if="selectedBank === 'all' || seeMore === account.id" class="bg-gray-100 ring ring-black/20 w-fit p-1 rounded-md">{{ account.bank }}</p>
              <p class="text-gray-800 font-mono bg-gray-100 ring ring-black/20 inline-block px-2 py-1 rounded">{{ account.accountNumber }}</p>
              <div v-if="seeMore === account.id && (account.phoneNumber || account.collection)" class="space-x-2">
                <p v-if="account.collection" class="text-gray-800 font-mono bg-gray-100 ring ring-black/20 inline-block px-2 py-1 rounded">{{ account.collection }}</p>
                <p v-if="account.phoneNumber" class="text-gray-800 font-mono bg-gray-100 ring ring-black/20 inline-block px-2 py-1 rounded">{{ account.phoneNumber }}</p>
              </div>
            </div>
          </div>
        </div> 
      </div>

      <div class="bg-slate-100 selection:bg-none select-none border-y border-y-slate-200 flex items-center">
        <div @click="copyToClipboard" class="p-1 rounded-md hover:bg-black/20 px-1 flex items-center">
          <SvgCopy v-if="!copied" class="w-7 p-1" src="/tocopy.svg" />
          <SvgCopied v-else class="w-7 p-1" src="/copied.svg" />
        </div>

        <div @click="toggleSeeMore(account.id)" class="p-1 rounded-md hover:bg-black/20 px-1.5 flex items-center">
          <SvgView v-if="seeMore === account.id" class="w-5"/>
          <SvgUnview v-else class="w-5"/>
        </div>

        <div v-if="multiSelect" class="rounded-md flex items-center">
          <div ref="menuToggleElement" @click="asyncWaitFunc" :class="[toggleMenu ? 'hover:bg-red-200' : 'hover:bg-black/20']" class="p-1 rounded-md flex items-center">
            <SvgCancel v-if="toggleMenu" class="w-5" />
            <SvgMore v-else class="w-5" />
          </div>
        </div>
        
        <div ref="menuElement" id="value" v-if="toggleMenu" class="absolute -bottom-12 ring ring-slate-400 z-2 right-1 rounded-md bg-slate-200">
          <div class="flex gap-2 p-2 justify-center">
          <div @click="toggleFav(account.id)" class="p-1 rounded-md hover:bg-green-300/30 px-1 flex items-center">
            <SvgFav v-if="account.favourite" class="w-5"/>
            <SvgUnfav v-else class="w-5"/>
          </div>  
            <div @click="delAccount(account.id)" class="p-1 rounded-md hover:bg-red-600/20 px-1 flex items-center w-fit">
              <SvgDelete class="w-5"/>
            </div>
            <div @click="editAccount(account.id)" class="rounded-md hover:bg-black/20 p-1 flex items-center w-fit">
              <SvgEdit class="w-5"/>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const selectStore = useSelectStore()
const {selectedList, ongoingSelection} = storeToRefs(selectStore)
const {start, stop} = selectStore

const accountStore = useAccountStore()
const {selectedBank, singleEdit, toggleEditAccountModal, seeMore, toggleDeleteAccountModal, singleDelete} = storeToRefs(accountStore)
const {toggleFav} = accountStore

const menuElement = ref<HTMLElement | null>(null)
const menuToggleElement = ref<HTMLElement | null>(null)

const toggleMenu = ref(false)

const emit = defineEmits<{
  accountID: [id: string]
}>()

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

const editAccount = (id: string) => {
  singleEdit.value = id
  toggleEditAccountModal.value = !toggleEditAccountModal.value      
}

const delAccount = (id: string) => {  
  singleDelete.value = id
  toggleDeleteAccountModal.value = !toggleDeleteAccountModal.value  
}  

const toggleSeeMore = (id: string) => {  
  if (seeMore.value === id) seeMore.value = ''
  else seeMore.value = id
}

const asyncWaitFunc = async () => {
  setTimeout(() => {
    toggleMenu.value = !toggleMenu.value
  }, 0);
}

const menuClick = (event: Event) => {      
  const target = event.target
  const el = menuElement.value

  if (toggleMenu.value) {    
    if (el instanceof HTMLElement && (target !== menuToggleElement.value && !menuToggleElement.value?.contains(target as ChildNode)) && !(el === target || el.contains(target as Node) || event.composedPath().includes(el))) {
        toggleMenu.value = false
      }
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

window.addEventListener('click', menuClick)

onUnmounted(() => {
  window.removeEventListener('click', menuClick)
})
</script>