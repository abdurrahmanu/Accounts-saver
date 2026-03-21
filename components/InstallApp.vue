<script lang="ts" setup>
interface BeforeInstallPromptEvent extends Event {
    readonly platforms :string[]
    readonly userChoice: Promise<{
        outcome: 'accepted' | 'dismissed'
    }>
    prompt(): Promise<void>
}

const showInstallButton = ref(true)
const deferredPrompt = ref<BeforeInstallPromptEvent | null>(null)

const captureInstallPrompt = (e: Event) => {
    e.preventDefault();
    deferredPrompt.value = e as BeforeInstallPromptEvent
    showInstallButton.value = true
}

onMounted(() => {
    window.addEventListener('beforeinstallprompt', captureInstallPrompt)
})

onUnmounted(() => {
    window.addEventListener('beforeinstallprompt', captureInstallPrompt)
})

const installApp = async() => {
    if (!deferredPrompt.value) return

    deferredPrompt.value.prompt()
    const {outcome} = await deferredPrompt.value.userChoice

    if (outcome === 'accepted') console.log('installed');
    else console.log('not installed');
    
    deferredPrompt.value = null
    showInstallButton.value = false
}
</script>

<template>
    <div class="">
        <div></div>
        <div v-if="showInstallButton">
            <button @click="installApp" class="bg-blue-400 p-4">lsadfasfsafd</button>
        </div>
    </div>
</template>