<script lang="ts" setup>
const model = defineModel<boolean>()

const props = defineProps<{
    toggle: boolean,
    account: Account
}>()
</script>

<template>
    <div>
        <label class="touch-friendly flex items-center justify-between pl-3 hover:bg-slate-200">
            <input 
            class="mt-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"  
            type="checkbox" 
            v-model="model">
            <div class="text-sm p-3 flex-1">
                <p class="block font-medium text-gray-700 whitespace-nowrap" for="">
                    {{ account.name }}
                    <span v-if="account.collection && !toggle" class="uppercase">- ({{ account.collection }})</span>
                </p>
                <p>{{ account.accountNumber }}</p>
                <p>{{ account.bank }}</p>
            </div>
        </label>
    </div>
</template>