<template>
    <div class="flex flex-col min-h-screen items-center justify-center py-2">
        <img src="/error.svg" alt="" class="w-10">
        <button @click="replace" class="px-4 py-1 text-lg text-center bg-green-200 hover:bg-green-500 cursor-pointer my-3">Go back Home</button>
    </div>
</template>

<script setup>
const replace = () => {
    clearError({redirect: '/'})
}
</script>

<style scoped>
div {
    padding-top: 200px;
}
</style>