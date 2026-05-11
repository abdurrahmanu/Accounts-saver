<template>
  <div class="flex flex-col flex-1 overflow-auto">

    <div class="flex justify-between items-center py-5 shrink-0">
      <div class="flex gap-3 px-2 text-xs">
        <div v-if="route.fullPath.includes('collections')" @click="router.back()" class="w-fit h-fit cursor-pointer">
          <SvgBack class="w-5" />
        </div>
        <h3 v-if="route.fullPath.includes('collections')" class="uppercase font-bold px-2 py-1 bg-slate-200 rounded-md">
          {{ route.params.id || route.params.col }}
        </h3>
        <p v-else class="font-bold px-2 py-1 bg-slate-200 rounded-md">ACCOUNTS</p>
      </div>
      
      <p v-if="accounts_?.length" class="uppercase mr-2 ring ring-slate-300 flex items-center gap-1 px-1 py-0.5 bg-slate-200 rounded-md font-medium">
        <span class="pl-1 text-xs">{{ selectedBank }}</span>
        <span class="font-bold font-mono">[{{ accounts_?.length }}]</span>
      </p>
    </div>
    
    <div v-if="accounts_?.length === 0" class="text-center text-gray-500 py-3 bg-white">
      <SvgBox class="w-30 -mb-10 mx-auto" />
      No accounts found. 
      <p>Add some accounts</p>
    </div>
    
    <div v-if="accounts_?.length" class="overflow-y-auto flex-1 pb-20 custom-scrollbar">
      <div v-for="acc in accounts_" :key="acc.id" class="bg-white">
        <AccountItem :account="acc" />
      </div>
    </div>
    
  </div>  
</template>

<script setup lang="ts">
const route = useRoute()
const router = useRouter()

const props = defineProps<{
  accounts_?: Account[]
}>()

const accountStore = useAccountStore()
const {selectedBank} = storeToRefs(accountStore)

const selectStore = useSelectStore()
const { selectedList, selectAll } = storeToRefs(selectStore)

watch(selectAll, (newVal, oldVal) => {
  if (newVal) {
    return props.accounts_?.forEach(acc => {
      if (selectedList.value.includes(acc.id)) return
      selectedList.value.push(acc.id)
    })
  } else {
    if (oldVal) {
      selectedList.value = []
    }
  }
})

watch(selectedList, newVal => {
  if (newVal) {
    if (newVal.length === props.accounts_?.length) {
      selectAll.value = true
    }
  }
})
</script>