import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { type Account } from '#imports'

export interface collectionForm {
  name: string,
  selectedAccounts: object
}

export const useCollectionStore = defineStore('accountsCollection', () => {
  const accountStore = useAccountStore()
  const listStore = useSelectStore()
  const collections = ref<string[]>([])
  const filteredCollections = ref<string[]>([])
  const view = ref<'collections' | 'bank'>('bank')

  const selectedCollection = ref('')
  const isCollection = ref(false)
  const currentCollection = ref('')
  const toggleCollectionForm = ref(false)
  const toggleEditCollectionModal = ref(false)

  if (import.meta.client) {
    const saved = localStorage.getItem('my-saved-collections')
    if (saved) {
      collections.value = JSON.parse(saved)
      filteredCollections.value = collections.value
    }
  }

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
    let selectedAccs = Object.keys(form.selectedAccounts).length      
    if (collections.value.includes(form.name.toLowerCase()) && !selectedAccs) return // group already exists and no new account added

    if (!collections.value.includes(form.name.toLowerCase())) collections.value.push(form.name.toLowerCase())

    if (selectedAccs) {
      accountStore.accounts = accountStore.accounts.map((acc: Account) => {
        if (form.selectedAccounts[acc.id as keyof object]) {
          acc.collection = form.name.toLowerCase()
        }
        return {...acc, collection: acc.collection.toLowerCase()}
      })
    }
  }

  const editCollection = (form: collectionForm) => {
    accountStore.accounts = accountStore.accounts.map((acc: Account) => {
      // had collection name but no longer has
      if (acc.collection === selectedCollection.value && !form.selectedAccounts[acc.id as keyof object]) {
        return {...acc, collection: ''}
      }
      // had collection but name is changed
      else if (acc.collection === selectedCollection.value) {
        return {...acc, collection: form.name.toLowerCase()}
      }
      // didn't have collection name but it has now
      else if (form.selectedAccounts[acc.id as keyof object]) {
        return {...acc, collection: form.name.toLowerCase()}
      }
      
      return acc
    })

    let index = collections.value.indexOf(selectedCollection.value)
    if (index !== -1) collections.value.splice(index, 1, form.name)
      
    toggleEditCollectionModal.value = !toggleEditCollectionModal
    selectedCollection.value = ''
  }

  const deleteCollection = () => {
    // delete collection
    collections.value.forEach((col, index) => {
      if (listStore.selectedList.includes(col)) {
        collections.value.splice(index, 1)
      }
    })

    // clear collection from accounts
    accountStore.accounts = accountStore.accounts.map(account => {
      let index = listStore.selectedList.indexOf(account.collection)
      if (index !== -1) {
        return {...account, collection: ''}
      } else return account
    })

    // if no account contains the collection, delete?
  }

  const showAccountsList = computed(() => {
    return view.value === 'bank' || (view.value === 'collections' && isCollection.value)
  })

  return { 
    isCollection,
    showAccountsList,
    currentCollection,
    toggleCollectionForm,
    toggleEditCollectionModal,
    filteredCollections,
    selectedCollection,
    editCollection,
    collections,
    view,
    createCollection,
    openCollection,
    deleteCollection,
  }
})