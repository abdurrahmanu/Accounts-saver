<script lang="ts" setup>
const groupStore = useAccountsCollection()
const {openCollection} = groupStore

const props = defineProps<{
  collections: String,
}>()
</script>

<template>
    <div @click="openCollection(collection)" class="w-20 h-20 md:w-50 md:h-50 flex items-center justify-center grow hover:bg-green-100 rounded-lg uppercase ring ring-slate-300" v-for="(collection, index) in collections" :key="index">{{ collection }}</div>
</template>