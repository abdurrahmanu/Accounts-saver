import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useSelectStore = defineStore('selectList', () => {
  const collectionStore = useCollectionStore()
  const accountStore = useAccountStore()
  const ongoingSelection = ref(false)
  const activateDelay = 700
  const selectedList = ref<string[]>([])
  const event = ref<'up' | 'down'>()
  const activateTimer = ref<ReturnType<typeof setTimeout>  | undefined>(undefined)
  const allSelected = ref(false)

  const selectedAccounts = computed<Account[]>(() => {
    return accountStore.accounts.filter((account: Account) => selectedList.value.includes(account.id))
  })

  const start = (event: Event, id: string) => {  
    if (event.type === 'touchstart') event.preventDefault()
              
    // remove item from the list      
    let alreadySelectedItem = selectedList.value.indexOf(id)
    if (alreadySelectedItem !== -1) {      
      allSelected.value = false              
      selectedList.value.splice(alreadySelectedItem, 1)          
      return
    } else {      
      if (ongoingSelection.value) {
        selectedList.value.push(id)        
      }
      else {    
        activateTimer.value = setTimeout(() => {
          selectedList.value.push(id)          
          ongoingSelection.value = true
        }, activateDelay)
      }
    }      
  }

  const stop = (event: Event, id: string) => {
    if (selectedList.value.length) return
    if (activateTimer.value) {
      if(collectionStore.view === 'collections' && !ongoingSelection.value && !collectionStore.isCollection) {
        collectionStore.openCollection(id)          
      }
      clearTimeout(activateTimer.value)
    }
  }

  const selectAll = (view: 'collections' | 'bank') => {
    if (view === 'bank') { 
      accountStore.filteredAndCategorizedAccounts.map((acc: {bankName: string, accounts: Account[]}) => acc.accounts).flat().forEach(acc => {
        if (!selectedList.value.includes(acc.id)) {
          selectedList.value.push(acc.id)
        }
      })
    } 
    
    else {      
      collectionStore.collections.forEach(col => {
        if (!selectedList.value.includes(col)) {
          selectedList.value.push(col)
        }
      })
    }

    allSelected.value = true
  }

  const cancel = (clearSelectAll?: boolean) => {
    if (!clearSelectAll) {
      ongoingSelection.value = false
    }
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