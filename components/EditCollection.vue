<template>
    <div>
        <div class="space-y-1">
            <label class="block font-medium text-gray-700">Full Name</label>
            <input v-model="value" type="text" required class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border" placeholder="Aliyu Balarabe">
        </div>
    </div>
</template>

<script setup lang="ts">
const value = ref('')
</script>