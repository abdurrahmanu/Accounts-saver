import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

export interface Router{
    details: object
}

export const useRoutingStore = defineStore('routingStore', () => {

    function stackRoute(id: string) {
        history.pushState({view: 'folder', id: ''}, '')
    }

    return { 

    }
})