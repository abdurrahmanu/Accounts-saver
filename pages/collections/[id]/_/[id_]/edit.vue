<template>
    <AppModal :toggle="correctPath">
      <EditAccount :account="editingAccount"  />
    </AppModal>
</template>

<script lang="ts" setup>
const route = useRoute()
const itemId = computed(() => route.params?.id_)

const accountStore = useAccountStore()
const {accounts} = storeToRefs(accountStore)

const editingAccount = computed(() => {
    return accounts.value.filter(account => account.id === itemId.value)[0]
})

const correctPath = computed(() => {    
    if (route.fullPath.length && itemId.value) {
        return route.fullPath === `/collections/${route.params.id}/_/${route.params.id_}/edit`
    }
    else return false
}) 
</script>