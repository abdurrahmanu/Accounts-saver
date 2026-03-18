<script lang="ts" setup>
const accountStore = useAccountStore()
const {toggleAppModal, popUp, accounts} = storeToRefs(accountStore)

const selectMode = useSelectListStore()
const {selectedList, ongoingSelection} = storeToRefs(selectMode)
const {selectAll, cancel} = selectMode

const svgs = {
    'Add Favourite': '',
    'Edit': '',
    'Details': '',
    'Delete': '',
    'Select': '',
    'Cancel': '',
}

const options = computed(() => {
    return [
        'Add Favourite',
        `${selectedList.value.length === 1 ? 'Edit' : 'Details'}`,
        selectedList.value.length === accounts.value.length ? ' Delete All' : 'Delete (' + selectedList.value.length + ')',
        'Select All',
        'Cancel',
    ]
})

const useOption = (option: string) => {
    option = option.toLowerCase()    
    if (option === 'select all') selectAll()
    else if (option === 'cancel') cancel()
    else if (option.includes('delete')) {   
     
        popUp.value = !popUp.value
    }
    else if (option === 'edit') {
        toggleAppModal.value = !toggleAppModal.value                
    }
    else if (option === 'details') {

    }
    else if (option === 'add favourite') {
        
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