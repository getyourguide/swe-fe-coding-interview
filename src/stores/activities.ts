import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useActivityStore = defineStore('activity', () => {
    const activities = ref([])
    return { activities }
})