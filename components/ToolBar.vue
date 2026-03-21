<script lang="ts" setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'

const accountStore = useAccountStore()
const { toggleDeleteAccountModal, accounts } = storeToRefs(accountStore)
const {toggleFav} = accountStore

const selectMode = useSelectListStore()
const { selectedList, ongoingSelection } = storeToRefs(selectMode)
const { selectAll, cancel } = selectMode

const collectionStore = useCollectionStore()
const {view, collections} = storeToRefs(collectionStore)

const svgs: Record<string, string> = {
  favourite: '/faved.svg',
  delete: '/delete.svg',
  'select all': '/selectall.svg',
  cancel: '/cancel.svg',
}

const options = computed(() => {
  const count = selectedList.value.length
  const total = view.value === 'bank' ? accounts.value.length : collections.value.length

  return [
    { id: 'favourite', 
      label: count === 0 ? 'add fav' : `add fav(${count})` 
    },
    { 
      id: 'delete', 
      label: count === total ? 'delete all' : count === 0 ? 'delete' : `delete (${count})` 
    },
    { id: 'select all', label: 'select all' },
    { id: 'cancel', label: 'cancel' },
  ]
})

// 3. Centralized Action Handler
const useOption = (id: string) => {
  switch (id) {
    case 'select all':
      selectAll(view.value)
      break
    case 'cancel':
      cancel()
      break
    case 'delete':      
      if (!selectedList.value.length) return
      toggleDeleteAccountModal.value = !toggleDeleteAccountModal.value    
      break
    case 'details':
      // Handle details logic here
      break
    case 'favourite':
      toggleFav()
      break
  }
}
</script>

<template>
  <transition name="slide-in">
    <div v-if="ongoingSelection" class="bg-white fixed w-full text-[10px] bottom-0 left-0">
      <ul class="flex">
        <li 
          v-for="option in options" 
          :key="option.id"
          @click="useOption(option.id)" 
          class="z-1 flex-1 text-center hover:bg-slate-200 cursor-pointer p-2 py-5 border-t border-slate-200 space-y-2 transition-colors"
        >
            <div class="h-5">
                <img 
                :src="svgs[option.id]"  
                class="w-5.5 mx-auto opacity-80"
                >
            </div>
          <p class="uppercase font-medium tracking-tighter">{{ option.label }}</p>
        </li>
      </ul>
    </div>
  </transition>
</template>

<style scoped>
.slide-in-enter-active,
.slide-in-leave-active {
  transition: transform 0.3s ease;
}

.slide-in-enter-from,
.slide-in-leave-to {
  transform: translateY(100%);
}
</style>