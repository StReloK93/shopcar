import { defineStore } from "pinia"
import { ref  } from "vue"

export const useProductStore = defineStore('products', () => {
    const productName = ref(null)

    return { productName }
})