<script lang="ts" setup>
import sort from './Svg/sort.vue'
import delete_ from './Svg/delete.vue'
import selectall from './Svg/selectall.vue'
import cancel_ from './Svg/cancel.vue'
import move from './Svg/arrowforward.vue'

const route = useRoute()

const accountStore = useAccountStore()
const { accounts, sortAccounts } = storeToRefs(accountStore)
const {toggleFav} = accountStore

const selectMode = useSelectStore()
const { selectedList, ongoingSelection, allSelected, selectAll } = storeToRefs(selectMode)
const { cancel } = selectMode

const collectionStore = useCollectionStore()
const { collections } = storeToRefs(collectionStore)

const options = computed(() => {
  const isAccountsRoute = computed(() => route.fullPath.startsWith('/accounts'))
  const count = selectedList.value.length
  const total = isAccountsRoute.value ? accounts.value.length : collections.value.length

  return [
    { id: isAccountsRoute.value ? 'sort' : 'move',
      label: isAccountsRoute.value ? 'sort' : 'move',
      icon: markRaw(isAccountsRoute.value ? sort : move)
    },
    (isAccountsRoute.value) && { 
      id: 'move',
      label: 'move',
      icon: markRaw(move)
    },
    { 
      id: 'delete', 
      label: count === total ? 'delete all' : count === 0 ? 'delete' : `delete (${count})`,
      icon: markRaw(delete_)
    },
    { id: 'select all', label: 'select all', icon: markRaw(selectall) },
    { id: 'cancel', label: 'cancel', icon: markRaw(cancel_) },
  ].filter(item => item !== false)
})

const useOption = (id: string) => {
  switch (id) {
    case 'move':
      break
    case 'sort':
      sortAccounts.value = !sortAccounts.value
      break
    case 'select all':
      if (selectAll.value) {
        selectedList.value = []
        allSelected.value = false
        selectAll.value = false
      }
      else selectAll.value = true
      break
    case 'cancel':
      cancel()
      break
    case 'delete':              
      if (!selectedList.value.length) return
      else navigateTo( route.fullPath + '/delete')
      break
    case 'sort':
      toggleFav()
      break
  }
}

const showToolBar = computed(() => ongoingSelection.value )
</script>

<template>
  <div v-if="!route.fullPath.endsWith('/delete') && !route.fullPath.endsWith('/edit')" class="fixed inset-x-0 bottom-6 z-50 flex justify-center pointer-events-none px-4">
    <transition name="slide-up">
      
      <div 
        v-if="showToolBar" 
        class="pointer-events-auto relative w-full max-w-sm bg-white/90 backdrop-blur-lg shadow-2xl shadow-black/10 border border-gray-200/60 rounded-2xl p-1">
        
        <div class="absolute -top-3 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full shadow-md z-10 flex items-center gap-1">
          <span>{{ selectedList.length }}</span>
          <span>Selected</span>
        </div>

        <div class="flex items-center justify-between">
          <button 
            v-for="option in options" 
            :key="option.id"
            @click="useOption(option.id)" 
            class="flex-1 flex flex-col items-center justify-center p-3 gap-1.5 rounded-xl text-gray-500 hover:text-gray-900 hover:bg-gray-100/80 active:scale-95 active:bg-gray-200 transition-all duration-200 focus:outline-none"
          >
            <div class="relative flex items-center justify-center h-6 w-6">
              <component :is="option.icon" class="w-5 h-5 transition-transform group-hover:scale-110" />
            </div>
            <span class="text-[10px] whitespace-nowrap sm:text-xs font-semibold uppercase tracking-wider">{{ option.label }}</span>
          </button>
        </div>

      </div>
      
    </transition>
  </div>
</template>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(150%) scale(0.9);
}
</style>