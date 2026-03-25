<template>
  <div class="relative overflow-y-hidden select-none selection:bg-none max-w-140 mx-auto ring max-h-screen min-h-screen ring-slate-200">
    <NuxtPwaManifest />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <ToolBar />
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

const selectStore = useSelectStore()
const {selectedList, ongoingSelection} = storeToRefs(selectStore)

onMounted(() => {
  if (route.fullPath !== '/accounts' && route.fullPath !== '/collections' && route.fullPath !== '/accounts/' && route.fullPath !== '/collections/') {    
    navigateTo('/accounts', {replace: true})
  }
})

watch(() => route.fullPath, (oldVal, newVal) => {
  if (['/accounts', '/accounts/'].includes(route.fullPath)) {
    selectedList.value = []
    ongoingSelection.value = false
  }
})
</script>