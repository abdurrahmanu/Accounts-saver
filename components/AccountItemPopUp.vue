<template>
    <div id="popup" v-if="routeLastName !== 'edit' && routeLastName !== 'delete'" ref="menuElement" class="absolute -bottom-12 ring ring-slate-400 z-2 right-1 rounded-md bg-slate-200">
          <div class="flex gap-2 p-2 justify-center">
            <div @click="toggleFav(account?.id)" class="p-1 rounded-md hover:bg-green-300/30 px-1 flex items-center">
                <SvgFav v-if="account?.favourite" class="w-5"/>
                <SvgUnfav v-else class="w-5"/>
            </div>  
            <div @click="delAccount(account ? account?.id : '')" class="p-1 rounded-md hover:bg-red-600/20 px-1 flex items-center w-fit">
                <SvgDelete class="w-5"/>
            </div>
            <div @click="editAccount(account ? account?.id : '')" class="rounded-md hover:bg-black/20 p-1 flex items-center w-fit">
              <SvgEdit class="w-5"/>
            </div>
          </div>
      </div>
</template>

<script setup lang="ts">
const modalClosed = ref(true)
const route = useRoute()
const itemId = computed(() => route.params.id)

const accountStore = useAccountStore()
const { accounts, singleEdit, singleDelete} = storeToRefs(accountStore)
const {toggleFav} = accountStore

const routeLastName = computed(() => {
  return route.name?.toString().slice(route.name?.toString().lastIndexOf('-') + 1)
})

const editAccount = (id: string) => {
  navigateTo(route.fullPath + `/edit`)
  singleEdit.value = id
  modalClosed.value = false
}

const delAccount = (id: string) => {
  navigateTo(route.fullPath + `/delete`)
  singleDelete.value = id
  modalClosed.value = false
}

const account = computed<Account>(() => {
  return accounts.value.filter(acc => acc.id === itemId.value)[0]
})
</script>