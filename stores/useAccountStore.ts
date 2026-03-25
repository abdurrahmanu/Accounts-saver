import { defineStore } from 'pinia'

export interface Account {
  id: string
  name: string
  nickname: string
  bank: string
  accountNumber: string
  selected: boolean
  favourite: boolean
  phoneNumber: string
  collection: string
}

export const useAccountStore = defineStore('accountStore', () => {
  const route = useRoute()

  const menuToggleElement = ref<HTMLElement | null>(null)

  const collectionStore = useCollectionStore()
  const selectStore = useSelectStore()
  const currentCollection = computed(() => collectionStore.currentCollection)
  const view = computed(() => collectionStore.view)
  
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
    if (saved) {
      accounts.value = JSON.parse(saved)
    }
  }

  watch(accounts, (newAccounts, oldAccounts) => {  
    if (import.meta.client) localStorage.setItem('my-saved-accounts', JSON.stringify(newAccounts))
  }, { deep: true })

  const addAccount = (account: Omit<Account, 'id'>, id?: string) => {        
    let editAccount = id

    if (editAccount) {      
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

    // Create New Collection
    if (account.collection && !collectionStore.collections.includes(account.collection)) {      
      collectionStore.createCollection({name: account.collection.toLowerCase(), selectedAccounts: {[id as keyof object]: true}})
    }
  }

  const deleteItem = (del_: string[]) => {                   
    if (view.value === 'collections') {
      collectionStore.deleteCollection()
    }      

    else if (view.value === 'bank') {
      if(del_.length === accounts.value.length) {
        accounts.value = []
      } else {
        let id = ''

        for (let index = 0; index < del_.length; index++) {  
          id = del_[index];
          accounts.value = accounts.value.filter(acc => acc.id !== id)
        }      
      }
     }

    toggleDeleteAccountModal.value = !toggleDeleteAccountModal.value
  }

  // Getters
  const uniqueBanks = computed(() => {
    const banks = accounts.value.map(acc => acc.bank)
    return [...new Set(banks)].sort()
  })

  const filteredAndCategorizedAccounts = computed(() => {        
    let result: Account[] = accounts.value

    // 1. Search filter    
    if (searchQuery.value) {
      const q = searchQuery.value.toLowerCase()
      result = result.filter(acc => 
        acc.name.toLowerCase().includes(q) ||
        acc.nickname.toLowerCase().includes(q) ||
        acc.accountNumber.includes(q)
      )
    }    

    if (route.fullPath.includes('collections')) {
      result = result.filter(account => account.collection === currentCollection.value)
    }
    
    // 2. Bank filter
    if (selectedBank.value) {
      if (selectedBank.value === 'all') result
      else if (selectedBank.value === 'favourites') result = result.filter(account => !!account.favourite)
      else result = result.filter(acc => acc.bank === selectedBank.value)
    }    
    
    // 3. Categorize by Bank
    const grouped = result.reduce((acc, current) => {
      if (!acc[current.bank]) {
        acc[current.bank] = []
      }
      acc[current.bank].push(current)
      return acc
    }, {} as Record<string, Account[]>)

    const returnArr = Object.keys(grouped).sort().map(bank => ({
      bankName: bank,
      accounts: grouped[bank]
    }))

    if (route.fullPath.includes('collections')) {
      let store: string[] = []
      
      if (selectedBank.value === 'all') {
        store = collectionStore.collections        
      } else if (selectedBank.value === 'favourites') {
        store = accounts.value.filter(acc => acc.collection.length && acc.favourite === true).map(acc => acc.collection)
      } else {
        store = accounts.value.filter(acc => acc.collection && acc.bank === selectedBank.value).map(acc => acc.collection)
      }

      store = [...new Set(store)]
      collectionStore.filteredCollections = store
    }
    
    // Convert to an array of objects
    return returnArr
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
    toggleFav,
    toggleEditAccountModal,
    openAccountsDropdown,
    filteredAndCategorizedAccounts, 
    addAccount,
    deleteItem
  }
})
