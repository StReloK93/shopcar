<template>
    <section name="indexSale" class="flex flex-col">
        <TransitionGroup name="fade">
            <ListProducts 
                v-if="PageData.activeList != null && PageData.listProducts[PageData.activeList].length" 
                @close="closeListProducts"
                @sold="sold"
                @onrollup="onrollup"
                @onFinished="onFinished"
                :listProducts="PageData.listProducts[PageData.activeList]" 
            />
        </TransitionGroup>

        <aside class="flex-between-center">
            <div>
                <RouterLink to="/soldproducts" class="py-1.5 inline-block">
                    <i class="fa-light fa-arrow-up-from-dotted-line text-red-600 mr-4"></i> Sotilgan
                </RouterLink>
                <span class="px-4"></span>
                <RouterLink to="/existproduct" class="py-1.5 inline-block">
                    <i class="fa-light fa-arrow-down-to-dotted-line text-blue-600 mr-4"></i> Do'kondagi
                </RouterLink>
            </div>
            <form @submit.prevent="getProductById(PageData.searchInput)">
                <input type="text" class="text-input bg-inherit text-center text-gray-600" v-model="PageData.searchInput" placeholder="Sotish ID-XXX">
            </form>
        </aside>
        
        <RouterView v-slot="{ Component }">
            <component ref="tables" class="h-full" :is="Component" />
        </RouterView>
        <main class="-mb-4 -mx-4 px-3 py-2 relative z-[100] bg-white text-gray-500">
            <button 
                v-for="(item, index) in PageData.listProducts" 
                @click="changeActiveList(index)" 
                :key="index" 
                :class="{'bg-pink-500 text-white': index == PageData.activeList}"
                class="px-3 py-1 bg-gray-200 rounded-sm mr-3 border-b border-pink-600 transition-all"
            >
                <i class="fa-solid fa-memo mr-1.5"></i> {{index + 1}}
            </button>
        </main>
    </section>
</template>
<script setup lang="ts">
import onScan from 'onscan.js'
import ListProducts from './components/ListProductsSold.vue'
import { reactive, watch, onUnmounted, ref, onMounted, provide } from 'vue'

const tables = ref()
const PageData = reactive({
    soldGrid: null,
    textInBarcode: null,
    listProducts: [],
    blocker: true,
    searchInput: null,
    activeList: null,
})

watch(() => PageData.textInBarcode , (currentValue) => {
    var productId = null
    if (currentValue == null || PageData.blocker == false) return
    PageData.blocker = false

    if(currentValue.includes(window.location.host)){
        productId = currentValue.slice(currentValue.lastIndexOf('/') + 1);
    }
    else{
        productId = currentValue.replace('product', '')
    }

    console.log(productId)
    
    getProductById(productId)
})

function getProductById(productId){
    PageData.searchInput = null

    if(PageData.activeList == null) {
       PageData.activeList = PageData.listProducts.push([]) - 1
    }
    
    const productIsset = PageData.listProducts[PageData.activeList].find(product => product.id == productId)

    
    // Agar bor bo'lsa
    if (productIsset) {
        if (productIsset.count > productIsset.totalCount) productIsset.totalCount++
        return PageData.blocker = true
    }



    // // yangi tovar bolsa
    axios.get(`products/${productId}`).then(({data}) => {

        PageData.blocker = true

        if(data.id){
            data.totalCount = 1
            data.selled_price = data.price
            PageData.listProducts[PageData.activeList].push(data)
        }

        else {
            
            if(PageData.listProducts[PageData.activeList].length == 0) {
                PageData.listProducts.splice(PageData.activeList, 1)
                PageData.activeList = null
            }
            
            swal.fire({
                text: 'Mahsulot mavjud emas!',
                showCancelButton: false,
                timer: 1000
            })
        }
        
    })
}

function closeListProducts() {
    PageData.listProducts.splice(PageData.activeList, 1)
    PageData.activeList = null
    PageData.blocker = true
    onFinished(false)
}

function onrollup(){
    PageData.activeList = null
    PageData.blocker = true
}

function changeActiveList(index){
    PageData.activeList = null
    setTimeout(() => PageData.activeList = index, 150);
}

function sold(sale){
    
    sale.sells.forEach(product => {
        // Real time yangilash uchun
        if(tables.value.productNames) {
            const api = tables.value.productNames.agGrid.api
            const rowNode = api.getRowNode(product.product_names_id)
            const selectedProduct = rowNode.data.products.find(prod => product.product_id == prod.id)

            const remainder = selectedProduct.count - product.count
            if(remainder == 0) rowNode.data.products = rowNode.data.products.filter(prod => product.product_id != prod.id)
            
            else{
                rowNode.data.products.forEach(prod => {
                    if(prod.id == product.product_id) prod.count = remainder
                })
            }
            rowNode.setData(rowNode.data)
        }

        // Real time yangilash uchun
        if(tables.value.products) {
            const api = tables.value.products.productAgGrid.api
            const rowNode = api.getRowNode(product.product_id)
            const remainder = rowNode.data.count - product.count

            if(remainder == 0) api.applyTransaction({remove: [rowNode.data]})
            else{
                rowNode.data.count = remainder
                rowNode.setData(rowNode.data)
            }
        }

    })
    
    if(tables.value.SellAgGrid) tables.value.SellAgGrid.api.applyTransaction({add: [sale],addIndex: 0})
    
    closeListProducts()
}




// @ts-ignore
if(document.scannerDetectionData == null) onScan.attachTo(document)
function Scancode(sScancode: any)  {
    setTimeout(() => {
        PageData.textInBarcode = sScancode.detail.scanCode
        setTimeout(() => PageData.textInBarcode = null)
    }, 50)  //200 works fine for me but you can adjust it
}

// Register event listener
onMounted(() => document.addEventListener('scan', Scancode))
onUnmounted(() => document.removeEventListener('scan', Scancode))
provide('getProductById', getProductById)

function onFinished(value){
    if(value) document.removeEventListener('scan', Scancode)
    else document.addEventListener('scan', Scancode)
}
</script>