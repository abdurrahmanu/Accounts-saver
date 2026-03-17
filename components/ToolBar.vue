<script lang="ts" setup>
import { useSelectListStore } from '~/stores/useSelectListStore';

const selectMode = useSelectListStore()
const {selectedList, ongoingSelection} = storeToRefs(selectMode)
const {selectAll, cancel, delete_} = selectMode

const svgs = {
    'Add Favourite': '',
    'Edit': '',
    'Details': '',
    'Delete': '',
    'Select': '',
    'Cancel': '',
}

const accountStore = useAccountStore()
const {popUp} = storeToRefs(accountStore)

const options = computed(() => {

    return [
        'Add Favourite',
        `${selectedList.value.length === 1 ? 'Edit' : 'Details'}`,
        selectedList.value.length < 2 ? 'Delete' : 'Delete All',
        'Select All',
        'Cancel',
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
    <transition v-if="ongoingSelection" name="slide-in">
        <div class="fixed w-full bottom-0 left-0 bg-white">
            <ul class="flex">
                <div @click="useOption(option)" v-for="(option, index) in options" :key="index" class="flex-1 text-xs text-center hover:bg-slate-200 p-2 py-5 border-t-slate-200 border-t">
                    <div>
                        <!-- <img :src="svgs['option']" alt=""> -->
                    </div>
                    <p>{{ option }}</p>
                </div>
            </ul>
        </div>
    </transition>
</template>

<style scoped>

</style>