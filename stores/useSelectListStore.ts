import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useSelectListStore = defineStore('selectList', () => {
  const collectionStore = useCollectionStore()
  const accountStore = useAccountStore()
  const ongoingSelection = ref(false)
  const activateDelay = 700
  const selectedList = ref<string[]>([])
  const event = ref<'up' | 'down'>()
  const activateTimer = ref<ReturnType<typeof setTimeout>  | undefined>(undefined)

  const selectedAccounts = computed<Account[]>(() => {
    return accountStore.accounts.filter((account: Account) => selectedList.value.includes(account.id))
  })

  const start = (id: string) => {              
    // remove item from the list      
    let alreadySelectedItem = selectedList.value.indexOf(id)
    if (alreadySelectedItem !== -1) {        
      selectedList.value.splice(alreadySelectedItem, 1)          
      // if (!selectedList.value.length) ongoingSelection.value = false
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

  const stop = (id: string) => {
    if (selectedList.value.length) return
    if (activateTimer.value) clearTimeout(activateTimer.value)
  }



  // select is the problem here.
  const selectAll = (view: 'collections' | 'bank') => {
    console.log(accountStore.filteredAndCategorizedAccounts);
    
    let a = Object.assign({}, ...accountStore.filteredAndCategorizedAccounts.map(account => {
      return {...account.accounts}
    }))

    if (view === 'bank') { 
      let listLength = accountStore.filteredAndCategorizedAccounts.length
      if (listLength) {
        for (let index = 0; index < listLength; index++) {
          // const id = accountStore.filteredAndCategorizedAccounts[index].id
          
          // if (!selectedList.value.includes(id)) {
          //   selectedList.value.push(id)
          // }
        }
      }
    } else {      
      collectionStore.collections.forEach(col => {
        if (!selectedList.value.includes(col)) {
          selectedList.value.push(col)
        }
      })
    }
  }

  const cancel = () => {
    selectedList.value = []
    ongoingSelection.value = false
  }

  return { 
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