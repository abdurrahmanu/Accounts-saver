import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { useAccountStore, type Account } from '#imports'

export const useSelectListStore = defineStore('selectList', () => {
  const useAccount = useAccountStore()
  const {accounts} = storeToRefs(useAccount)
  const {deleteAccount} = useAccount

  const activateDelay = 700
  const selectedList = ref<string[]>([])
  const event = ref<'up' | 'down'>()
  const activateTimer = ref<ReturnType<typeof setTimeout>  | undefined>(undefined)

  const selectedAccounts = computed<Account[]>(() => {
    return accounts.value.filter(account => selectedList.value.includes(account.id))
  })

  const start = (id: string) => {      
      // remove item from the list
      let listSize = selectedList.value.length
      let alreadySelectedItem = selectedList.value.indexOf(id)
      if (alreadySelectedItem !== -1) {
        selectedList.value.splice(alreadySelectedItem, 1)          
        return
      } else {
        if (listSize) selectedList.value.push(id)
        else {
          activateTimer.value = setTimeout(() => {
            selectedList.value.push(id)          
          }, activateDelay)
        }
      }
  }

  const stop = (id: string) => {
      if (selectedList.value.length) {
        return
      }
      if (activateTimer.value) clearTimeout(activateTimer.value)
  }

  const selectAll = () => {
    if (accounts.value.length) {
      for (let index = 0; index < accounts.value.length; index++) {
        const id = accounts.value[index].id

        if (!selectedList.value.includes(id)) {
          selectedList.value.push(id)
        }
        
      }
    }
  }

  const cancel = () => {
    if (selectedList.value.length) {
      selectedList.value = []
    }
  }

  const delete_ = () => {
    deleteAccount(selectedList.value)
  }


  return { 
    activateTimer,
    selectedAccounts,
    selectedList,
    event,
    start,
    stop,
    cancel,
    delete_,
    selectAll,
  }
})