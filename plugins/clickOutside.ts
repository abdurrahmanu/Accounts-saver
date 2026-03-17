export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.directive('click-outside', {
        mounted(el: HTMLElement & {_clickOutside?: (event: Event) => void}, binding) {
            el._clickOutside = (event: Event) => {
                if (!(el === event.target || el.contains(event.target as Node))) {
                    binding.value(event)
                }
            };
            document.addEventListener('click',el._clickOutside)
        },
        unmounted(el: HTMLElement & {_clickOutside?: (event: Event) => void}) {
            if (el._clickOutside) {
                document.removeEventListener('click', el._clickOutside)
            }
        }
    })
})

