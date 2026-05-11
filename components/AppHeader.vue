<template>
  <header class="w-full bg-white flex items-center justify-between px-4 py-3 shadow-sm border-b border-gray-100 z-10">
    <div class="flex items-center gap-2">
      <SvgLogo class="w-10 rotate-12 relative -top-1"/>
      <div class="flex flex-col">  
        <h1 class="text-xs font-bold tracking-wider text-gray-900">ACCOUNTS MANAGER</h1>
        <p class="text-gray-500 font-medium text-[10px] sm:text-xs">Easily manage your accounts.</p>
      </div>
    </div>

    <div v-if="route.fullPath.startsWith('/accounts')">
      <button 
      @click="goBack"
      v-if="route.fullPath.endsWith('addAccount')"
      class="flex items-center gap-2 text-xs font-medium text-slate-700 bg-white ring-1 ring-slate-300 rounded-md hover:bg-slate-50 transition-colors px-3 py-1.5 focus:outline-none">
        Close Form
        <SvgMinus class="w-4 h-4 text-slate-500"/>
      </button>
      <button 
      @click="goTo('addAccount')"
      v-else
      class="flex items-center gap-2 text-xs font-medium bg-slate-200 rounded-md hover:bg-slate-300 transition-colors px-3 py-1.5 shadow-sm focus:outline-none">
        Add Account
        <SvgPlus class="w-4 h-4"/>
      </button>
    </div>

    <div v-else-if="route.fullPath.startsWith('/collections')">
      <button 
      @click="goBack"
      v-if="route.fullPath.endsWith('addCol')"
      class="flex items-center gap-2 text-xs font-medium text-slate-700 bg-white ring-1 ring-slate-300 rounded-md hover:bg-slate-50 transition-colors px-3 py-1.5 focus:outline-none">
        Close Form
        <SvgMinus class="w-4 h-4 text-slate-500"/>
      </button>
      <button 
      @click="goTo('addCol')"
      v-else
      class="flex items-center gap-2 text-xs font-medium bg-slate-200 rounded-md hover:bg-slate-300 transition-colors px-3 py-1.5 shadow-sm focus:outline-none">
        Add Collection
        <SvgPlus class="w-4 h-4"/>
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
const route = useRoute()
const router = useRouter()

const goBack = () => router.back()

const goTo = (type: 'addAccount' | 'addCol') => {    
  const basePath = route.path.replace(/\/_$/, '')
  navigateTo(`${basePath}/${type}`)
}

const route_ = computed(() => {
  return route.path.replace('/\/$/', '')
})
</script>