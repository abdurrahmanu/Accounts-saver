<script lang="ts" setup>
import { useSelectListStore } from '~/stores/useSelectListStore';

const activateList = useSelectListStore()
const {selectedList} = storeToRefs(activateList)
const {selectAll, cancel, delete_} = activateList

const accountStore = useAccountStore()
const {popUp} = storeToRefs(accountStore)

const options = computed(() => {
    return [
        'Details',
        'Edit',
        selectedList.value.length < 2 ? 'Delete' : 'Delete All',
        'Cancel',
        'Select All'
    ]
})

const useOption = (option: string) => {
    if (option === 'Select All') selectAll()
    else if (option === 'Cancel') cancel()
    else if (option === 'Delete' || option === 'Delete All') {        
        popUp.value = !popUp.value
    }
    return option
}
</script>

<template>
    <transition v-if="selectedList.length" name="slide-in">
        <div class="fixed w-full bottom-0 left-0 bg-white">
            <ul class="flex">
                <li @click="useOption(option)" v-for="(option, index) in options" :key="index" class="flex-1 text-center hover:bg-slate-200 p-2 py-5 border-t-slate-200 border-t">{{ option }}</li>
            </ul>
        </div>
    </transition>
</template>

<style scoped>

</style>