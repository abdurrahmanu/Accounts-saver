<script setup lang="ts">
const route = useRoute()
const accountstore = useAccountStore()
const {accounts, selectedBank, searchQuery} = storeToRefs(accountstore)

const accountsToShow = computed<Account[]>(() => {
    let result: Account[] = accounts.value

    if (searchQuery.value) {        
      const q = searchQuery.value.toLowerCase()
        result = result.filter(acc => 
        acc.name.toLowerCase().includes(q) ||
        acc.nickname.toLowerCase().includes(q) ||
        acc.accountNumber.includes(q)
      )
    }    
    else {
        if (selectedBank.value) {                        
            if (selectedBank.value === 'all') result
            else if (selectedBank.value === 'favourites') result = result.filter(account => !!account.favourite)
            else result = result.filter(acc => acc.bank.toLowerCase() === selectedBank.value.toLowerCase())
        }
    }

    return result
})

const showAccountsList = computed(() => !route.fullPath.endsWith('/addAccount'))
</script>

<template>
    <AccountList v-if="showAccountsList" :accounts_="accountsToShow" />
    <NuxtPage />
</template>