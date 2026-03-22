<script lang="ts" setup>
    interface Bank {
        name: string
        code: string
    }

    interface BankResponse {
        data: Bank[]
    }

    const banks = ref<string[]>([])

    const banksList = ref([
    'Access Bank Plc', 'UBA United Bank for Africa', 'Zenith Bank Plc', 'GTBank Guarantee Trust Holding Company GTCO', 'First Bank', 'Opay', 'Palmpay', 'Kuda Bank', 'Fidelity Bank', 'Ecobank', 'FCMB First City Monument Bank', 'MoniePoint', 'Polaris Bank', 'Keystone Bank', 'Providus Bank', 'Titan Trust Bank', 'Unity Bank', 'Standard Chartered Bank', 'Globus Bank', 'Parallex Bank', 'Jaiz Bank', 'Premium Trust Bank', 'Sterling Bank', 'Stanbic IBTC', 'Lotus Bank', 'Signature Bank', 'Alternative Bank (AltBank)', 'SunTrust Bank'
    ])

    const {data, error} = await useFetch<BankResponse>('/nigerianBanks.json')

    if (error.value) {
        banks.value = banksList.value
    } else {
        banks.value = data.value?.data.map(data => data.name) || banksList.value    
    }

    const props = defineProps<{
        toggle: boolean,
        searchQuery: string
    }>()

    const emit = defineEmits<{
        addBank: [bank: string]
    }>()

    console.log(props.searchQuery)

    const filteredBanks = computed(() => {
        if (props.searchQuery) {
            return (banks.value || banksList.value).filter(bank => bank.toLowerCase().includes(props.searchQuery.toLowerCase()))
        } 
        return null
    })

    const emitEvent = (bank: string) => {    
        emit('addBank', bank)
    }
</script>

<template>
    <div v-if="toggle">
        <ul class="max-h-40 w-full absolute z-2 bg-white ring ring-slate-300 rounded-md px-1 overflow-y-scroll">
            <li @click="emitEvent(bank)" v-for="(bank, index) in filteredBanks || banks" :key="index" class="hover:bg-slate-200 transition-all duration-100 p-1 z-3">{{bank}}</li>
        </ul>
    </div>
</template>