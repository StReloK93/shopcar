<template>
    <section class="relative flex flex-col justify-between">
        <main>
            <div class="mb-3">
                Sale
            </div>
            <Transition name="fade">
                <ListProducts v-if="PageData.listProducts.length" @close="closeListProducts" @sold="sold" :setProductId="setProductId" :listProducts="PageData.listProducts" />
            </Transition>
            <div>
                <button @click="emulated(`product${product.id}`)" v-for="product in ProductsList" class="w-28 py-0.5 bg-gray-200 mr-2 shadow mb-3">
                    {{ product.product_names.name }} <span class="ml-5">{{ product.size.name }} </span>
                </button>
                <button @click="emulated(`product22`)" class="w-28 py-0.5 bg-gray-200 mr-2 shadow mb-3">
                    StReLoK <span class="ml-5">22</span>
                </button>
            </div>
        </main>
        <main class="flex-grow mt-4">
            <AgGridVue
                class="h-full ag-theme-alpine w-full"
                :getRowId="(params) => params.data.id"
                :rowData="Sells"
                :columnDefs="PageData.columnDefs"
                :animateRows="true"
                @gridReady="gridReady"
            ></AgGridVue>
        </main>
    </section>
</template>
<script setup lang="ts">
import { GridOptions } from '../../interfaces/AgGridInterfaces'
import onScan from 'onscan.js'
import axios from '../../modules/axios'
import moment from 'moment'
import { reactive, watch, computed ,ref} from 'vue'
import ListProducts from './components/ListProducts.vue'
import { tailwindSwal } from '../../modules/swal'


// test
const ProductsList = ref()
axios.get('products').then(({data}) => {
    ProductsList.value = data
})

function emulated(product){
    onScan.simulate(document, product)
}

// test

const Sells = ref(null)
axios.get('sells').then(({data}) => {
    Sells.value = data
})


const PageData = reactive({
    textInBarcode: null,
    listProducts: [],
    blocker: true,
    columnDefs: [
        { field: 'product_names.name', headerName: 'Name' , flex: 1},
        { field: 'size.name' , headerName: 'Size', width: 80, },
        { field: 'price' , headerName: 'Price' },
        { field: 'sold_price' , headerName: 'Sold price'},
        { field: 'count' , headerName: 'Count'},
        { field: 'created_at', headerName: 'Created' , cellRenderer: params => moment(params.value).fromNow() },
    ]
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
        else tailwindSwal.fire({
            text: 'Product not found',
            showCancelButton: false,
            timer: 1000
        })
    })
    
})


function sold(data){
    SellAgGrid.api.applyTransaction({add: data,addIndex: 0})
    closeListProducts()
}

const SellAgGrid: GridOptions = reactive({
    api: null,
    columnApi: null
})

function gridReady(grid){
    SellAgGrid.api = grid.api
    SellAgGrid.columnApi = grid.columnApi
}

function closeListProducts() {
    PageData.listProducts = []
    PageData.blocker = true
}


function setProductId(id) {
    PageData.textInBarcode = `product${id}`
    setTimeout(() => PageData.textInBarcode = null)
}




// @ts-ignore
if(document.scannerDetectionData == null){
    onScan.attachTo(document)
}



// Register event listener
document.addEventListener('scan', (sScancode: any) => {
    setTimeout(() => {
        PageData.textInBarcode = sScancode.detail.scanCode

        setTimeout(() => PageData.textInBarcode = null)
    }, 100)  //200 works fine for me but you can adjust it
})
</script>
<style src="../../assets/ag-grid.css"></style>