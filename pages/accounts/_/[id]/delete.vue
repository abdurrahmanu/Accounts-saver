<template>
    <AppModal :toggle="correctPath">
      <DeleteItems />
    </AppModal>
</template>

<script setup lang="ts">
const route = useRoute()
const itemId = computed(() => route.params.id)

const accountStore = useAccountStore()
const {accounts} = storeToRefs(accountStore)

const editingAccount = computed(() => {
    return accounts.value.filter(account => account.id === itemId.value)[0]
})

const correctPath = computed(() => {    
    if (route.fullPath.length && itemId.value && editingAccount.value.id) {
        return route.fullPath === `/accounts/_/${editingAccount.value.id}/delete`
    }
    else return false
}) 
</script>