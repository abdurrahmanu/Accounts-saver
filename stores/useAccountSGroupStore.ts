import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { type Account } from '#imports'

export const useAccountsCollection = defineStore('accountsCollection', () => {
    const collections = ref<string[]>([
        'Dorayi', 'Gift', 'Friends', 'Family', 'Customers'
    ])

    const view = ref<'collections' | 'bank'>('bank')
    
    const isCollection = ref(false)
    const currentCollection = ref('')

    const openCollection = (collection: string) => {
      currentCollection.value = collection
      isCollection.value = true
    }

  return { 
    isCollection,
    currentCollection,
    collections,
    view,
    openCollection
  }
})