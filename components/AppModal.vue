<template>
    <div @click.self="startClose" class="z-3 bg-black/80 absolute top-0 left-0 bottom-0 right-0 flex items-end pb-20">
        <transition name="slide-in" appear @after-leave="navigateBack">
            <div v-if="localToggle" class="max-w-130 w-[90%] h-fit mx-auto z-4 rounded-md p-3 bg-white">
                <slot/>
            </div>
        </transition>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const props = defineProps<{
    toggle: boolean
}>()

const localToggle = ref(false)

watch(() => props.toggle, (newVal) => {    
    localToggle.value = newVal
})

const startClose = () => {
    localToggle.value = false
}

const navigateBack = () => {
    router.back()
}

onMounted(() => {
    setTimeout(() => {
        if (props.toggle) localToggle.value = true
    }, 0);
})
</script>

<style scoped>
.slide-in-enter-active,
.slide-in-leave-active {
  transition: transform 0.3s ease;
}

.slide-in-enter-from,
.slide-in-leave-to {
  transform: translateY(100%);
}
</style>