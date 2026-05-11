<template>
    <div class="flex justify-center items-center">
        <div class="`max-w-125 w-[95%] mx-auto rounded-md space-y-3 bg-slate-100 relative p-2">            
            <p class="text-center text-black font-medium flex justify-center gap-1">
                <span class="text-red-500">Delete</span> 
                <div v-if="selectedList.length">
                    <span v-if="selectedList.length === 1" class="uppercase">{{ selectedList[0] }}</span>
                </div>
                <div v-else>
                    <p>Delete All {{ selectedList.length }} Collections</p>
                </div>
            </p>

            <div class="flex gap-4 justify-center mt-4">
                <button @click="router.back()" class="py-1 px-10 rounded-md ring-1 ring-green-600 hover:bg-green-100 transition-colors">CANCEL</button>
                <button @click="handleDelete" class="py-1 px-10 rounded-md ring-1 ring-red-400 hover:bg-red-100 transition-colors">DELETE</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const router = useRouter()

const colStore = useCollectionStore()
const {deleteCollection} = colStore

const selectList = useSelectStore()
const { selectedList } = storeToRefs(selectList)

const handleDelete = () => {    
    deleteCollection()
    router.back()
}
</script>