<template>
    <div v-if="toggleAppModal" class="z-3 bg-black/60 fixed top-0 left-0 bottom-0 right-0 flex items-center justify-center">
        <div class="max-w-130 w-[90%] mx-auto z-4 rounded-md p-3 bg-white">
            <slot/>
        </div>
    </div>
</template>

<script setup lang="ts">
const accountStore = useAccountStore()
const {toggleAppModal} = storeToRefs(accountStore)
</script>