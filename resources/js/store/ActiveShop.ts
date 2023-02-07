import { defineStore } from "pinia"
import { ref, computed, Ref } from "vue"
import { getStorageKey, setStorageKey } from "@/modules/localstorage"

export const ActiveShop = defineStore('activeshop', () => {
    const activeShop: Ref<Number> = ref(JSON.parse(getStorageKey('shop', null)))

    const getActiveShop = computed(() => activeShop.value)

    function setActiveShop(number: Number) {
        setStorageKey('shop', number)
        activeShop.value = JSON.parse(getStorageKey('shop'))
    }

    return { activeShop, setActiveShop, getActiveShop }
})