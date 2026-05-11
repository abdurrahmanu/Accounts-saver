export const useAccountStore = defineStore('accountStore', () => {
  const menuToggleElement = ref<HTMLElement | null>(null)

  const collectionStore = useCollectionStore()
  const selectStore = useSelectStore()
  
  const sortAccounts = ref(false)
  const selectedItemFor_route = ref<Account | null>(null)
  const singleDelete = ref('')
  const singleEdit = ref('')
  const seeMore = ref('')
  const toggleEditAccountModal = ref(false)
  const addNewAccount = ref(false)
  const accounts = ref<Account[]>([])
  const searchQuery = ref('')
  const selectedBank = ref('all')
  const toggleDeleteAccountModal = ref(false)
  const openAccountsDropdown = ref(false)
  const singleSelectedId = ref('')

  if (import.meta.client) {
    const saved = localStorage.getItem('my-saved-accounts')
    if (saved) accounts.value = JSON.parse(saved)
  }

  watch(accounts, (newAccounts) => {  
    if (import.meta.client) {
      localStorage.setItem('my-saved-accounts', JSON.stringify(newAccounts))
    }
  }, { deep: true })

  const addAccount = (account: Omit<Account, 'id'>, id?: string) => {        
    let accountAlreadyExists = id
  

    if (accountAlreadyExists) {      
      accounts.value = accounts.value.map(acc => {
        if (acc.id === id) {          
          return {...acc, ...account}
        } 
        return acc
      })
    } else {      
      accounts.value.push({
        id: crypto.randomUUID(),
        ...account
      })
    }    

    if (account.collection && !collectionStore.collections.includes(account.collection)) {      
      collectionStore.createCollection({
        name: account.collection.toLowerCase(), 
        selectedAccounts: {[id as keyof object]: true}
      })
    }
  }

  const deleteItems = (del_: string[]) => {                   
    if(del_.length === accounts.value.length) {
      accounts.value = []
    } else {
      let id = ''

      for (let index = 0; index < del_.length; index++) {  
        id = del_[index];
        accounts.value = accounts.value.filter(acc => acc.id !== id)
      }      
    }

    toggleDeleteAccountModal.value = !toggleDeleteAccountModal.value
    selectStore.selectedList = selectStore.selectedList.filter(item => {
      return !del_.includes(item)
    })    
  }

  // Getters
  const uniqueBanks = computed(() => {
    const banks = accounts.value.map(acc => acc.bank)
    return [...new Set(banks)].sort()
  })

  const toggleFav = (id?: string) => {        
    if (selectStore.selectedList.length > 1) {
      accounts.value = accounts.value.map(account => {
        if (id === account.id) {
          let isFavourite = !!account.favourite
          return {
            ...account,
            favourite: !isFavourite
          }
        } 
        return account
      })    
    } else {
      accounts.value = accounts.value.map(account => {
        if (selectStore.selectedList.includes(account.id)) {
          let isFavourite = !!account.favourite
          return {
            ...account,
            favourite: !isFavourite
          }
        } 
        return account
      })    
    }
  }

  return { 
    toggleDeleteAccountModal,
    selectedItemFor_route,
    sortAccounts,
    accounts, 
    searchQuery, 
    selectedBank, 
    uniqueBanks, 
    seeMore,
    singleDelete,
    singleSelectedId,
    singleEdit,
    addNewAccount,
    menuToggleElement,
    toggleEditAccountModal,
    openAccountsDropdown,
    toggleFav,
    addAccount,
    deleteItems
  }
})
