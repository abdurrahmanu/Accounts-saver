<template>
    <div class="flex relative w-fit">
        <div class="h-fit w-fit -rotate-90 absolute top-2.5 right-1.5">
            <svg class="w-4" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path :fill="!sortAccounts ? '#000000' : '#05df72'" d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"/><path :fill="!sortAccounts ? '#000000' : '#05df72'" d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"/></svg>
        </div>
        <div class="h-fit w-fit rotate-90">
            <svg class="w-4" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path :fill="sortAccounts ? '#000000' : '#05df72'" d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"/><path :fill="sortAccounts ? '#000000' : '#05df72'" d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"/></svg>
        </div>
    </div>

</template>

<script setup>
import { useAccountStore } from '#imports';

const accountStore = useAccountStore()
const {sortAccounts} = storeToRefs(accountStore)
</script>