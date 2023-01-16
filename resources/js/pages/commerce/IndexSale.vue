<template>
    <section class="flex flex-col justify-between">
        <Transition name="fade">
            <ListProducts v-if="PageData.listProducts.length" @close="closeListProducts" @sold="sold" :listProducts="PageData.listProducts" />
        </Transition>
        <main>
            <div class="mb-3">
                <RouterLink to="/soldproducts" class="mx-3">Sotilgan tovarlar</RouterLink>
                <RouterLink to="/existproduct">Mavjud tovarlar</RouterLink>
                
            </div>
        </main>
        <main class="flex-grow mt-4">
            <RouterView ref="soldProductsComponent"></RouterView>
        </main>
    </section>
</template>
<script setup lang="ts">
import onScan from 'onscan.js'
import ListProducts from './components/ListProducts.vue'
import { reactive, watch, computed , onUnmounted, ref, onMounted} from 'vue'

const soldProductsComponent = ref()
const PageData = reactive({
    soldGrid: null,
    textInBarcode: null,
    listProducts: [],
    blocker: true,
})

const textinBarcode = computed(() => PageData.textInBarcode)

watch(textinBarcode, (currentValue) => {

    if (currentValue == null || PageData.blocker == false) return
    PageData.blocker = false


    // textdan IDni ajratib olamiz
    const productId = currentValue.replace('product', '')
    const product = PageData.listProducts.find(product => product.id == productId)

    // Agar bor bo'lsa
    if (product) {
        if (product.count > product.totalCount) product.totalCount++
        return PageData.blocker = true
    }



    // yangi tovar bolsa
    axios.get(`products/${productId}`).then(({data}) => {
        PageData.blocker = true
        if(data.id){
            data.totalCount = 1
            data.sold_price = data.price
            PageData.listProducts.push(data)
        }
        else swal.fire({
            text: 'Mahsulot mavjud emas!',
            showCancelButton: false,
            timer: 1000
        })
    })
})


function sold(data){
    PageData.soldGrid.api.applyTransaction({add: data,addIndex: 0})
    closeListProducts()
}


function closeListProducts() {
    PageData.listProducts = []
    PageData.blocker = true
}

// @ts-ignore
if(document.scannerDetectionData == null) onScan.attachTo(document)
function Scancode(sScancode: any)  {
    setTimeout(() => {
        PageData.textInBarcode = sScancode.detail.scanCode
        setTimeout(() => PageData.textInBarcode = null)
    }, 100)  //200 works fine for me but you can adjust it
}


// Register event listener
onMounted(() => {
    document.addEventListener('scan', Scancode)
    
    PageData.soldGrid = soldProductsComponent.value.SellAgGrid
})
onUnmounted(() => document.removeEventListener('scan', Scancode))
</script>
<style src="../../assets/ag-grid.css"></style>