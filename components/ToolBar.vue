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
const { selectedList, ongoingSelection, allSelected } = storeToRefs(selectMode)
const { selectAll, cancel, } = selectMode

const collectionStore = useCollectionStore()
const {view, collections, isCollection} = storeToRefs(collectionStore)

const options = computed(() => {
  const isAccountsRoute = computed(() => route.fullPath === '/accounts/_' || route.fullPath === '/accounts/_/')
  const count = selectedList.value.length
  const total = view.value === 'bank' ? accounts.value.length : collections.value.length

  return [
    { id: isAccountsRoute.value || isCollection.value ? 'sort' : 'move',
      label: isAccountsRoute.value || isCollection.value ? 'sort' : 'move',
      icon: markRaw(isAccountsRoute.value || isCollection.value ? sort : move)
    },
    (isAccountsRoute.value || isCollection.value) && { 
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

// 3. Centralized Action Handler
const useOption = (id: string) => {
  switch (id) {
    case 'move':
      break
    case 'sort':
      sortAccounts.value = !sortAccounts.value
      break
    case 'select all':
      if (allSelected.value) cancel(true)
      else selectAll(view.value)
      break
    case 'cancel':
      cancel()
      navigateTo('/accounts', {replace: true})
      break
    case 'delete':      
      if (!selectedList.value.length) return
      navigateTo('/accounts/_/delete')
      break
    case 'sort':
      toggleFav()
      break
  }
}
</script>

<template>
  <transition name="slide-in">
    <div v-if="ongoingSelection" class="bg-white absolute w-full text-[10px] bottom-0 left-0">
      <ul class="flex">
        <li 
          v-for="option in options" 
          :key="option.id"
          @click="useOption(option.id)" 
          class="z-1 flex-1 text-center hover:bg-slate-200 cursor-pointer p-2 py-5 border-t border-slate-200 space-y-2 transition-colors"
        >
            <div class="h-5">
                <component :is="option.icon" class="w-5 mx-auto" />
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