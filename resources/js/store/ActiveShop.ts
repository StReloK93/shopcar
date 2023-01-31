import { defineStore } from "pinia"
import { ref, computed, Ref } from "vue"
import { getStorageKey, setStorageKey } from "@/modules/localstorage"

export const ActiveShop = defineStore('activeshop', () => {
    const activeShop: Ref<Number> = ref(JSON.parse(getStorageKey('listType', null)))

    const getActiveShop = computed(() => activeShop.value)

    function setActiveShop(number: Number) {
        setStorageKey('listType', number)
        activeShop.value = JSON.parse(getStorageKey('listType'))
    }

    return { activeShop, setActiveShop, getActiveShop }
})