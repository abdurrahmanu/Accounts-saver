import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { type Account } from '#imports'

export interface collectionForm {
  name: string,
  selectedAccounts: string[]
}

export const useAccountsCollection = defineStore('accountsCollection', () => {
    const accountStore = useAccountStore()
    const collections = ref<string[]>([])
    const view = ref<'collections' | 'bank'>('bank')
    
    const isCollection = ref(false)
    const currentCollection = ref('')
    const toggleCollectionForm = ref(false)

    const openCollection = (collection: string) => {
      currentCollection.value = collection
      isCollection.value = true
    }

    // Watch for changes and save to LocalStorage automatically
    watch(collections, (newCollections, oldCollections) => {  
      if (import.meta.client) {
        localStorage.setItem('my-saved-collections', JSON.stringify(newCollections))
      }
    }, { deep: true })

    const createCollection = (form: collectionForm) => {            
      if (collections.value.includes(form.name) && !form.selectedAccounts.length) return // group already exists and no new account added
      if (!collections.value.includes(form.name)) collections.value.push(form.name)

      if (form.selectedAccounts) {
        accountStore.accounts = accountStore.accounts.map((acc: Account) => {
          if (form.selectedAccounts.includes(acc.id)) {
            acc.collection = form.name
          }
          return {...acc, collection: acc.collection}
        })
      }
    }

  const showAccountsList = computed(() => {
    return view.value === 'bank' || (view.value === 'collections' && isCollection.value)
  })

  return { 
    isCollection,
    showAccountsList,
    currentCollection,
    toggleCollectionForm,
    collections,
    view,
    createCollection,
    openCollection
  }
})