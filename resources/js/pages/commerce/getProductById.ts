import { watch, ref, onMounted, onUnmounted } from 'vue'
import onScan from 'onscan.js'

export const getProduct = () => {
    const textInBarcode = ref(null)
    const listProducts = ref([])
    const blocker = ref(true)
    const activeList = ref(null)

    watch(() => textInBarcode.value, (currentValue) => {
        var productId = null
        if (currentValue == null || blocker.value == false) return
        blocker.value = false

        if (currentValue.includes(window.location.host)) productId = currentValue.slice(currentValue.lastIndexOf('/') + 1);
        else productId = currentValue.replace('product', '')


        getProductById(productId)
    })

    function getProductById(productId) {
        if (activeList.value == null) {
            activeList.value = listProducts.value.push([]) - 1
        }

        const productIsset = listProducts.value[activeList.value].find(product => product.id == productId)
        // Agar bor bo'lsa
        if (productIsset) {
            if (productIsset.count > productIsset.totalCount) productIsset.totalCount++
            return blocker.value = true
        }

        // // yangi tovar bolsa
        axios.get(`products/${productId}`).then(({ data }) => {

            blocker.value = true

            if (data.id) {
                data.totalCount = 1
                data.selled_price = data.price
                listProducts.value[activeList.value].push(data)
            }

            else {

                if (listProducts.value[activeList.value].length == 0) {
                    listProducts.value.splice(activeList.value, 1)
                    activeList.value = null
                }

                swal.fire({
                    text: 'Mahsulot mavjud emas!',
                    showCancelButton: false,
                    timer: 1000
                })
            }

        })
    }


    // @ts-ignore
    if (document.scannerDetectionData == null) onScan.attachTo(document)
    function Scancode(sScancode: any) {
        setTimeout(() => {
            textInBarcode.value = sScancode.detail.scanCode
            console.log(textInBarcode.value)

            setTimeout(() => textInBarcode.value = null)
        }, 50)  //200 works fine for me but you can adjust it
    }

    // Register event listener
    onMounted(() => document.addEventListener('scan', Scancode))
    onUnmounted(() => document.removeEventListener('scan', Scancode))

    function onFinished(value) {
        if (value) document.removeEventListener('scan', Scancode)
        else document.addEventListener('scan', Scancode)
    }

    return { getProductById, onFinished, textInBarcode, listProducts, blocker, activeList }
}