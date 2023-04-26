import { defineStore } from "pinia"
import { ref , computed, Ref} from "vue"
import { getStorageKey , setStorageKey } from "@/modules/localstorage"

export const useQrCodeStore = defineStore('qrcode', () => {
    const qrcode:Ref<boolean> = ref(JSON.parse(getStorageKey('qrcode', true)))

    const getQrcode = computed(() => qrcode.value)

    function setQrcode(boolean) {
        setStorageKey('qrcode', boolean)
        qrcode.value = JSON.parse(getStorageKey('qrcode', true))
    }

    return { qrcode, setQrcode, getQrcode }
})