// middleware/route-cleanup.global.ts

export default defineNuxtRouteMiddleware((to, from) => {
    const selectMode = useSelectStore()
    const { selectedList, ongoingSelection } = storeToRefs(selectMode)

    if (to.fullPath !== '/' && to.fullPath.charAt(to.fullPath.length - 1) === '/') {
        let slicedPath = to.fullPath.slice(0,-1)        
        return navigateTo(slicedPath, {replace: true})
    }

    if (process.server || !from.name) {          
        if (to.fullPath !== '/' && to.fullPath.charAt(to.fullPath.length - 1) === '_') {
            let slicedPath = to.fullPath.slice(0,-1)        
            return navigateTo(slicedPath, {replace: true})
        }
        
        if (to.fullPath.includes('accounts/_')) {            
            return navigateTo('/accounts', {replace: true})
        }
        
        if (to.fullPath.includes('collections/_')) {            
            return navigateTo('/collections', {replace: true})
        }
    }

    if (!to.path.includes('/_') && from.path.includes('/_')) {        
        selectedList.value = []
        ongoingSelection.value = false
    }
})