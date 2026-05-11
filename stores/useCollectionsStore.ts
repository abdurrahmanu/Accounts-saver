export const useCollectionStore = defineStore('accountsCollection', () => {
  const accountStore = useAccountStore()
  const listStore = useSelectStore()
  const collections = ref<string[]>([])
  const filteredCollections = ref<string[]>([])
  const view = ref<'collections' | 'bank'>('bank')

  const selectedCollection = ref('')
  const currentCollection = ref('')
  const toggleEditCollectionModal = ref(false)
  const toggleDeleteCollectionModal = ref(false)

  if (import.meta.client) {
    const saved = localStorage.getItem('my-saved-collections')
    if (saved) {
      collections.value = JSON.parse(saved)
      filteredCollections.value = collections.value
    }
  }

  const openCollection = (collection: string) => {        
    currentCollection.value = collection
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
      if (acc.collection === selectedCollection.value && !form.selectedAccounts[acc.id as keyof object]) {
        return {...acc, collection: ''}
      }

      else if (acc.collection === selectedCollection.value) {
        return {...acc, collection: form.name.toLowerCase()}
      }

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
    collections.value.forEach((col, index) => {
      if (listStore.selectedList.includes(col)) {
        collections.value.splice(index, 1)
      }
    })

    accountStore.accounts = accountStore.accounts.map(account => {
      let index = listStore.selectedList.indexOf(account.collection)
      if (index !== -1) {
        return {...account, collection: ''}
      } else return account
    })
  }

  return { 
    currentCollection,
    toggleEditCollectionModal,
    toggleDeleteCollectionModal,
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