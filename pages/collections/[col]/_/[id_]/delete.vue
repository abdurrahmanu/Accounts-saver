<template>
    <div>
        <AppModal :toggle="correctPath">
            <div v-if="deletingAccount">
                <DeleteAccounts />
            </div>
        </AppModal>
    </div>
</template>

<script setup lang="ts">
const selectStore = useSelectStore()
const {selectedList} = storeToRefs(selectStore)

const route = useRoute()
const itemId = computed(() => route.params?.id_)

const accountStore = useAccountStore()
const {accounts} = storeToRefs(accountStore)

const deletingAccount = computed<Account>(() => {    
    return accounts.value.filter(account => account.id === itemId.value)[0]
})

const correctPath = computed(() => {    
    if (route.fullPath.length && selectedList.value.length) {
        return route.fullPath === `/collections/${route.params.col}/_/${route.params.id_}/delete`
    }
    else return false
}) 
</script>
