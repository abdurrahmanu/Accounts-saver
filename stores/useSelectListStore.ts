import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useSelectStore = defineStore('selectList', () => {
  const router = useRouter()
  const route = useRoute()
  const collectionStore = useCollectionStore()
  const accountStore = useAccountStore()
  const ongoingSelection = ref(false)
  const activateDelay = 700
  const selectedList = ref<string[]>([])
  const event = ref<'up' | 'down'>()
  const activateTimer = ref<ReturnType<typeof setTimeout>  | undefined>(undefined)
  const allSelected = ref(false)
  const selectAll = ref(false)

  const selectedAccounts = computed<Account[]>(() => {
    return accountStore.accounts.filter((account: Account) => selectedList.value.includes(account.id))
  })

  const start = (event: Event, id: string) => {                   
    let alreadySelectedItem = selectedList.value.indexOf(id)
    if (alreadySelectedItem !== -1) {      
      allSelected.value = false              
      selectedList.value.splice(alreadySelectedItem, 1)          
    } 
    
    else {      
      if (ongoingSelection.value) {        
        selectedList.value.push(id)        
      }
      else {    
        activateTimer.value = setTimeout(() => {                    
          selectedList.value.push(id)         
          ongoingSelection.value = true
          navigateTo(route.path + '/_')
        }, activateDelay)
      }
    }      
  }

  const stop = (event: Event, id: string, openCol?: boolean) => {    
    if (selectedList.value.length) return
    if (activateTimer.value) {
      if(!ongoingSelection.value) {                
        collectionStore.openCollection(id)          
      }
      clearTimeout(activateTimer.value)
    }
  }

  const cancel = (clearSelectAll?: boolean) => {    
    if (!clearSelectAll) {
      ongoingSelection.value = false
    }
    router.back()
    selectedList.value = []
    allSelected.value = false
  }

  return { 
    allSelected,
    activateTimer,
    selectedAccounts,
    selectedList,
    ongoingSelection,
    event,
    start,
    stop,
    cancel,
    selectAll,
  }
})