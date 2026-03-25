<template>
    <div ref="menuElement" id="value" v-if="route.fullPath === `/accounts/_/${itemId}`" class="absolute -bottom-12 ring ring-slate-400 z-2 right-1 rounded-md bg-slate-200">
          <div class="flex gap-2 p-2 justify-center">
            <div @click="toggleFav(account?.id)" class="p-1 rounded-md hover:bg-green-300/30 px-1 flex items-center">
                <SvgFav v-if="account?.favourite" class="w-5"/>
                <SvgUnfav v-else class="w-5"/>
            </div>  
            <NuxtLink :to="`/accounts/_/${itemId}/delete`" replace>
              <div @click="delAccount(account ? account?.id : '')" class="p-1 rounded-md hover:bg-red-600/20 px-1 flex items-center w-fit">
                  <SvgDelete class="w-5"/>
                </div>
            </NuxtLink>
            <NuxtLink :to="`/accounts/_/${itemId}/edit`" replace>
              <div @click="editAccount(account ? account?.id : '')" class="rounded-md hover:bg-black/20 p-1 flex items-center w-fit">
                <SvgEdit class="w-5"/>
              </div>
            </NuxtLink>
          </div>
      </div>
</template>

<script setup lang="ts">
const route = useRoute()
const itemId = computed(() => route.params.id)

const accountStore = useAccountStore()
const { accounts, singleEdit, singleDelete, menuToggleElement} = storeToRefs(accountStore)
const {toggleFav} = accountStore

const toggleMenu = computed(() => {
  if (typeof route.fullPath === 'string') return route.fullPath === `/accounts/_/${itemId.value}`
  else return false
})

const menuElement = ref<HTMLElement | null>(null)

const editAccount = (id: string) => singleEdit.value = id

const delAccount = (id: string) => {  
  singleDelete.value = id
}  

const menuClick = (event: Event) => {      
  const target = event.target
  const el = menuElement.value

  if (toggleMenu.value) {    
    if (el instanceof HTMLElement && (target !== menuToggleElement.value && !menuToggleElement.value?.contains(target as ChildNode)) && !(el === target || el.contains(target as Node) || event.composedPath().includes(el))) {
        navigateTo('/accounts/_', {replace: true})
      }
  }  
}

const account = computed<Account>(() => {
  return accounts.value.filter(acc => acc.id === itemId.value)[0]
})

window.addEventListener('click', menuClick)

onUnmounted(() => {
  window.removeEventListener('click', menuClick)
})
</script>