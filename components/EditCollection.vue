<script setup lang="ts">
const collectionStore = useCollectionStore()
const {toggleEditCollectionModal} = storeToRefs(collectionStore)
const {editCollection} = collectionStore

const listStore = useSelectListStore()
const {selectedList} = storeToRefs(listStore)

const openAccountsDropdown = ref(false)

const accountStore = useAccountStore()
const {accounts} = storeToRefs(accountStore)

const form = reactive<collectionForm>({
    name: selectedList.value[0],
    selectedAccounts: ref(
        Object.assign({}, ...accounts.value.map(account => {
            return {[account.id.toString()]: false}
        }))
    )
})

const readOnlyForm = {
    name: selectedList.value[0],
    selectedAccounts: Object.assign({}, ...accounts.value.map(account => {
            return {[account.id.toString()]: false}
        }))
}

const formIsChanged = computed(() => {
    let nameChanged = form.name.trim() !== readOnlyForm.name.trim()

    return Object.entries(readOnlyForm.selectedAccounts).some(field => {
        return field[1] !== form.selectedAccounts[field[0] as keyof object]
    }) || nameChanged
})
</script>

<template>
    <div>
        {{ formIsChanged }}
        <h3 class="block font-medium text-gray-700 pb-2">Edit Collection</h3>

        <div class="font-medium text-gray-700 text-xs flex items-center justify-between gap-3 ring ring-slate-400 rounded-md mb-2">
            <div class="flex items-center justify-stretch gap-2">
                <p class="uppercase px-3 py-2 bg-slate-200 rounded-l-md">Collection Name:</p>
                <div>
                    <input v-model="form.name" type="text" class="inline-block h-full outline-none appearance-none w-full" placeholder="collection">
                </div>
            </div>
        </div>
        <AccountSelect 
        v-for="(account, index) in accounts" :key="index"
        :account="account" 
        :toggle="openAccountsDropdown" 
        v-model="form.selectedAccounts[account.id as keyof object]" />

        <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3 py-1">
                <!-- <div @click="form.favourite = !form.favourite" class="ring-1 ring-green-500 rounded-sm p-1 flex items-center justify-center">
                    <div :class="[form.favourite && 'bg-green-600']" class="rounded-sm p-2"></div>
                </div> -->
                <span class="text-sm">Add to Favorites</span>
            </div>
            <div class="space-x-2">
                <button @click="toggleEditCollectionModal = false" class="ring px-5 py-1 bg-red-300 hover:bg-red-300 ring-slate-300 rounded-md">CLOSE</button>
                <button v-if="formIsChanged" @click="editCollection(form, )" class="ring px-5 py-1 bg-green-300 hover:bg-green-300 ring-slate-300 rounded-md">SAVE</button>
            </div>
        </div>
    </div>
</template>
