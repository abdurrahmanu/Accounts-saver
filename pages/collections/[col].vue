<script setup lang="ts">
const route = useRoute()

const accountstore = useAccountStore()
const {accounts, selectedBank, searchQuery} = storeToRefs(accountstore)

const accountsInCollection = computed(() => {
    return accounts.value.filter(account => account.collection === route.params.col)
})

const accountsToShow = computed<Account[]>(() => {
    let result: Account[] = accountsInCollection.value

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
</script>

<template>
    <AccountList :accounts_="accountsToShow" />
    <NuxtPage />
</template>


























