<script setup lang="ts">
const route = useRoute()

const showFilterRoutes = computed(() => {
    return (!route.fullPath.includes('/addCollection') && !route.fullPath.includes('/addAccount'))
})

const selectStore = useSelectStore()
const {selectedAccountId } = storeToRefs(selectStore)

const unfocusNodeFn = (event: FocusEvent) => {  
  const clickedElement = event.target as HTMLElement

  const isPopupElement = clickedElement.id === 'popup' || clickedElement.closest('#popup')
  const popupToggle = clickedElement.id === 'toggle-popup' || clickedElement.closest('#toggle-popup')
    
  if (!isPopupElement && !popupToggle && selectedAccountId.value) {        
    let lastIndexOfSlash = route.fullPath.lastIndexOf('/')
    let correctedRoute = route.fullPath.slice(0, lastIndexOfSlash)
    navigateTo(correctedRoute)
    selectedAccountId.value = ''
  }
}

onMounted(() => {
  window.addEventListener('click', unfocusNodeFn)
})

onUnmounted(() => {
  window.removeEventListener('click', unfocusNodeFn)
})
</script>

<template>
    <NuxtPwaManifest />
    <div class="relative overflow-y-hidden select-none selection:bg-none max-w-140 mx-auto ring max-h-screen min-h-screen ring-slate-200">
        <AppHeader />
        <div class="flex flex-col max-h-dvh">
            <SearchAndFilters v-if="showFilterRoutes" />
            <NuxtPage />
        </div>
    </div>
</template>

<style>
.custom-scrollbar::-webkit-scrollbar { width: 3px; height: 3px; }
.custom-scrollbar::-webkit-scrollbar-track { background: rgb(233, 228, 228); }
.custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0, 0, 0, 0.3); border-radius: 4px; }
.custom-scrollbar:hover::-webkit-scrollbar-thumb { background: rgba(0, 0, 0, 0.5); }
</style>