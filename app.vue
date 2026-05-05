<script setup lang="ts">
const selectStore = useSelectStore()
const {selectedList, ongoingSelection, selectedAccountId } = storeToRefs(selectStore)

const unfocusNodeFn = (event: FocusEvent) => {
  const clickedElement = event.target
  const isIgnoreElement = clickedElement instanceof HTMLElement && (clickedElement.id === 'selection' || clickedElement.querySelector(`[id="selection"]`))   


  if (isIgnoreElement) {
    // selectedAccountId.value = ''
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
  <div class="relative overflow-y-hidden select-none selection:bg-none max-w-140 mx-auto ring max-h-screen min-h-screen ring-slate-200">
    <NuxtPwaManifest />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>