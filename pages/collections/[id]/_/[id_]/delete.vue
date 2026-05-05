<template>
    <AppModal :toggle="correctPath">
      <DeleteItems :account="deletingAccount" />
    </AppModal>
</template>

<script setup lang="ts">
const selectStore = useSelectStore()
const {selectedList} = storeToRefs(selectStore)

const route = useRoute()
const itemId = computed(() => route.params?.id_)

const accountStore = useAccountStore()
const {accounts} = storeToRefs(accountStore)

const deletingAccount = computed(() => {
    return accounts.value.filter(account => account.id === itemId.value)[0]
})

const correctPath = computed(() => {    
    if (route.fullPath.length && selectedList.value.length) {
        return route.fullPath === `/collections/${route.params.id}/_/${route.params.id_}/delete`
    }
    else return false
}) 
</script>
