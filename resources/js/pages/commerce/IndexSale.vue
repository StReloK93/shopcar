<template>
    <section class="flex flex-col justify-between">

        <main class="flex justify-between items-center">
            <div>
                <RouterLink to="/soldproducts" class="mr-3">Sotilgan mahsulotlar</RouterLink>
                <RouterLink to="/existproduct">Do'kondagi mahsulotlar</RouterLink>
            </div>
            <form @submit.prevent="getProductById(PageData.searchInput)">
                <input type="text" class="text-input bg-inherit" v-model="PageData.searchInput" placeholder="Mahsulot ID">
            </form>
        </main>
        <main class="flex-grow mt-4 relative">
            <Transition name="fade">
                <ListProducts v-if="PageData.listProducts.length" @close="closeListProducts" @sold="sold" :listProducts="PageData.listProducts" />
            </Transition>

            <RouterView v-slot="{ Component }">
                <component ref="soldProductsComponent" :is="Component" />
            </RouterView>
        </main>
    </section>
</template>
<script setup lang="ts">
import onScan from 'onscan.js'
import ListProducts from './components/ListProducts.vue'
import { reactive, watch, onUnmounted, ref, onMounted } from 'vue'

const soldProductsComponent = ref()
const PageData = reactive({
    soldGrid: null,
    textInBarcode: null,
    listProducts: [],
    blocker: true,
    searchInput: null,
})

watch(() => PageData.textInBarcode , (currentValue) => {

    if (currentValue == null || PageData.blocker == false) return
    PageData.blocker = false
    // textdan IDni ajratib olamiz
    const productId = currentValue.replace('product', '')
    getProductById(productId)

})

function getProductById(productId){
    PageData.searchInput = null
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
}


function sold(data){
    soldProductsComponent.value.SellAgGrid.api.applyTransaction({add: data,addIndex: 0})
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
onMounted(() => document.addEventListener('scan', Scancode))
onUnmounted(() => document.removeEventListener('scan', Scancode))
</script>
<style src="../../assets/ag-grid.css"></style>