import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

export interface Account {
  id: string
  name: string
  nickname: string
  bank: string
  accountNumber: string
  selected: boolean
  favourite: boolean
  phoneNumber: string
}

export const useAccountStore = defineStore('accountStore', () => {
  const addNewAccount = ref(false)
  const accounts = ref<Account[]>([])
  const searchQuery = ref('')
  const selectedBank = ref('all')
  const popUp = ref(false)

  // Load from LocalStorage for offline persistence (Client-side only)
  if (import.meta.client) {
    const saved = localStorage.getItem('my-saved-accounts')
    if (saved) {
      accounts.value = JSON.parse(saved)
    }
  }

  // Watch for changes and save to LocalStorage automatically
  watch(accounts, (newAccounts) => {
    if (import.meta.client) {
      localStorage.setItem('my-saved-accounts', JSON.stringify(newAccounts))
    }
  }, { deep: true })


  // Actions
  const addAccount = (account: Omit<Account, 'id'>) => {
    accounts.value.push({
      id: crypto.randomUUID(), // Generates a unique ID
      ...account
    })
  }

  const deleteAccount = (del_accounts: string[]) => {         
    if (del_accounts.length === accounts.value.length) {
      accounts.value = []
    } else {      
      let id = ''

      for (let index = 0; index < del_accounts.length; index++) {  
        id = del_accounts[index];
        accounts.value = accounts.value.filter(acc => acc.id !== id)
      }      
    }

    popUp.value = !popUp.value
  }

  // Getters
  const uniqueBanks = computed(() => {
    const banks = accounts.value.map(acc => acc.bank)
    return [...new Set(banks)].sort()
  })

  const filteredAndCategorizedAccounts = computed(() => {
    let result = accounts.value

    // 1. Search filter
    if (searchQuery.value) {
      const q = searchQuery.value.toLowerCase()
      result = result.filter(acc => 
        acc.name.toLowerCase().includes(q) ||
        acc.nickname.toLowerCase().includes(q) ||
        acc.accountNumber.includes(q)
      )
    }

    // 2. Bank filter
    if (selectedBank.value) {
      if (selectedBank.value === 'all') result = accounts.value
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

    // Convert to an array of objects for easier looping in Vue
    return Object.keys(grouped).sort().map(bank => ({
      bankName: bank,
      accounts: grouped[bank]
    }))
  })

  const numberOfAccountsFiltered = computed(() => {
    return filteredAndCategorizedAccounts.value.filter(acc => acc.bankName.toLowerCase() === selectedBank.value.toLowerCase())[0]?.accounts.length
  })

  return { 
    popUp,
    accounts, 
    searchQuery, 
    selectedBank, 
    uniqueBanks, 
    addNewAccount,
    numberOfAccountsFiltered,
    filteredAndCategorizedAccounts, 
    addAccount,
    deleteAccount
  }
})