<script lang="ts" setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'

const accountStore = useAccountStore()
const { toggleAppModal, popUp, accounts } = storeToRefs(accountStore)

const selectMode = useSelectListStore()
const { selectedList, ongoingSelection } = storeToRefs(selectMode)
const { selectAll, cancel } = selectMode

const svgs: Record<string, string> = {
  favourite: '/faved.svg',
  edit: '/edit.svg',
  details: '/details.svg',
  delete: '/delete.svg',
  'select all': '/select.svg',
  cancel: '/cancel.svg',
}

const options = computed(() => {
  const count = selectedList.value.length
  const total = accounts.value.length

  return [
    { id: 'favourite', label: 'favourite' },
    { 
      id: count === 1 ? 'edit' : 'details', 
      label: count === 1 ? 'edit' : 'details' 
    },
    { 
      id: 'delete', 
      label: count === total ? 'delete all' : `delete (${count})` 
    },
    { id: 'select all', label: 'select all' },
    { id: 'cancel', label: 'cancel' },
  ]
})

// 3. Centralized Action Handler
const useOption = (id: string) => {
  switch (id) {
    case 'select all':
      selectAll()
      break
    case 'cancel':
      cancel()
      break
    case 'delete':
      popUp.value = !popUp.value
      break
    case 'edit':
      toggleAppModal.value = !toggleAppModal.value
      break
    case 'details':
      // Handle details logic here
      break
    case 'favourite':
      // Handle favourite logic here
      break
  }
}
</script>

<template>
  <transition name="slide-in">
    <div v-if="ongoingSelection" class="fixed w-full bottom-0 left-0 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)] z-50">
      <ul class="flex">
        <li 
          v-for="option in options" 
          :key="option.id"
          @click="useOption(option.id)" 
          class="flex-1 text-xs text-center hover:bg-slate-100 cursor-pointer p-2 py-5 border-t border-slate-200 space-y-2 transition-colors"
        >
          <img 
            :src="svgs[option.id]" 
            :alt="option.label" 
            class="w-6 mx-auto opacity-80"
          >
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