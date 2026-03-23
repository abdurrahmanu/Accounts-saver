<template>
    <div class="flex justify-between">
      <div :class="{
        'bg-slate-200 hover:bg-slate-200': selectedList.includes(account.id),
        'hover:bg-zinc-200': !selectedList.includes(account.id),
        'border-l-green-500': account.favourite,
        'border-l-transparent': !account.favourite
      }"
    @touchstart.prevent="selectMode.start($event, account.id)" 
    @touchend="selectMode.stop($event, account.id)" 
    @mouseup="selectMode.stop($event, account.id)"
    @mousedown="selectMode.start($event, account.id)"
    class="text-xs px-4 pl-1 py-2 border-y border-y-gray-300 transition flex-1 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative border-l-6">
        <div class="flex justify-between w-full">
          <div>
            <div class="flex">
              <div class="flex gap-2 items-center">
                <div v-if="ongoingSelection">
                  <SvgChecked v-if="selectedList.includes(account.id)" class="w-5" />
                  <SvgUnchecked v-else class="w-5" alt=""/>
                </div>
                <div v-if="seeMore === account.id">
                  <SvgUser class="w-16" />
                </div>
                <div>
                  <div class="flex gap-2 items-start">
                    <div>
                      <h4 class="font-medium text-gray-800 uppercase">{{ account.name }} <span v-if="account.nickname" class="text-gray-500 font-normal text-sm">({{ account.nickname }})</span></h4>
                      <p class="text-gray-800 mt-1 font-mono bg-gray-200 inline-block px-2 py-1 rounded">
                        {{ account.accountNumber }}
                      </p>
                      <p v-if="selectedBank === 'all'">{{ account.bank }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="seeMore === account.id && (account.phoneNumber || account.collection)" class="min-w-40 ring rounded-md p-2 m-1 gap-4 ring-slate-200 bg-slate-200">
              <p v-if="account.phoneNumber" class=""><span class="font-bold">PHONE NUMBER:</span> {{ account.phoneNumber }}</p>
              <p v-if="account.collection" class=""><span class="font-bold">COLLECTION:</span> {{ account.collection }}</p>
            </div>
        </div>
        </div> 
      </div>

      <div class="bg-slate-100 selection:bg-none select-none border-y border-y-slate-200 flex items-center">
        <div @click="copyToClipboard" class="p-1 rounded-md hover:bg-black/20 px-1 flex items-center">
          <SvgCopy v-if="!copied" class="w-7 p-1" src="/tocopy.svg" />
          <SvgCopied v-else class="w-7 p-1" src="/copied.svg" />
        </div>

        <div v-if="multiSelect" class="rounded-md flex items-center">
          <div @click="toggleFav(account.id)" class="p-1 rounded-md hover:bg-green-300/30 px-1 flex items-center">
            <SvgFav v-if="account.favourite" class="w-5"/>
            <SvgUnfav v-else class="w-5"/>
          </div>

          <div @click="delAccount(account.id)" class="p-1 rounded-md hover:bg-red-600/20 px-1 flex items-center">
            <SvgDelete class="w-5"/>
          </div>
        </div>
        
        <div @click="toggleSeeMore(account.id)" class="p-1 rounded-md hover:bg-black/20 px-1.5 flex items-center">
          <SvgView v-if="seeMore === account.id" class="w-6"/>
          <SvgUnview v-else class="w-5"/>
        </div>

        <div v-if="multiSelect" @click="editAccount(account.id)" class="p-1 rounded-md hover:bg-black/20 px-1 flex items-center">
          <SvgEdit class="w-5"/>
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const selectMode = useSelectListStore()
const {selectedList, ongoingSelection} = storeToRefs(selectMode)

const accountStore = useAccountStore()
const {selectedBank, singleEdit, toggleEditAccountModal, seeMore, toggleDeleteAccountModal, singleDelete} = storeToRefs(accountStore)
const {toggleFav} = accountStore

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

const singleSelect = computed(() => {
  return selectedList.value.length === 1 && selectedList.value[0] === props.account.id
})

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
</script>