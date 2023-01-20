import { defineStore } from "pinia"
import { ref , computed, Ref} from "vue"
import { getStorageKey , setStorageKey } from "@/modules/localstorage"

export const useListTypeStore = defineStore('listType', () => {
    const type:Ref<boolean> = ref(JSON.parse(getStorageKey('listType', true)))

    const getListType = computed(() => type.value)

    function setListType(boolean) {
        setStorageKey('listType', boolean)
        type.value = JSON.parse(getStorageKey('listType', true))
    }

    return { type, setListType, getListType }
})