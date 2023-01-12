<template>
    <section @click="$emit('close')" class="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40 p-8">
        <main @click.stop class="h-full w-full bg-white flex flex-col justify-between p-2">
            <header class="flex-between-center bg-gray-100 border-b -m-2 mb-0">
                <div class="px-3 font-semibold">
                    {{ productName.name }}
                </div>
                <button @click="$emit('close')" class="px-4 py-2 hover:bg-gray-200">
                    <i class="far fa-times text-red-500"></i>
                </button>
            </header>
            <div class="py-1.5 flex-between-center">
                <span>
                    Size type ({{ pageData.size_name }})
                </span>
                <div class="flex">
                    <button v-for="size in emptySizes" @click="createProduct(size)" class="bg-gray-200 shadow rounded-sm border-b-2 border-pink-500 w-14 px-2 py-0.5 ml-2 flex-between-center active:bg-gray-200 hover:bg-gray-300">
                        <i class="fal fa-plus text-xs"></i> <span>{{ size.name }}</span> 
                    </button>
                </div>
            </div>
            <aside class="flex-grow">
                <AgGridVue
                    class="h-full ag-theme-alpine"
                    :getRowId="(params) => params.data.id"
                    :rowData="productName.products"
                    :columnDefs="columnDefs"
                    @cellValueChanged="cellValueChanged"
                    @gridReady="gridReady"
                    :animateRows="true"
                    :undoRedoCellEditing="true"
                ></AgGridVue>
            </aside>
            <div class="mt-3 text-right">
                <button @click="$emit('deleteProduct', productName)" class="py-1 px-3 bg-gray-200 shadow border-b-2 border-pink-500 active:bg-gray-300">
                    <i class="far fa-trash text-pink-500 mr-2"></i> Delete product
                </button>
            </div>
        </main>
    </section>
</template>

<script setup lang="ts">
import { tailwindSwal } from '../../modules/swal'
import { GridApi } from "ag-grid-community"
import { GridOptions } from '../../interfaces/AgGridInterfaces'
import { ref , reactive , computed } from "vue"
import { useProductStore } from '../../store/useProductStore'
import cellEditor from './countEditor.vue'
import numberEditor from './numberEditor.vue'
import axios from '../../modules/axios'
const { productName, gridApi } = defineProps({
    productName: Object,
    gridApi: GridApi
})
const store = useProductStore()

const pageData = reactive({
    size_name: null,
    sizes: []
})

const emptySizes = computed(() => {
    return pageData.sizes.filter(size => {
        const product = productName.products.find((product) => product.size_id == size.id)
        if(product == null) return true
    })
})

axios.get(`sizenames/${productName.size_names_id}`).then((res) => {
    pageData.size_name = res.data.name
    pageData.sizes = res.data.sizes
})


const columnDefs = ref([
    { headerName: "Size", field: "size.name" , flex: 1  },
    { headerName: "Original", field: "original_price",  editable: true , width: 130 , cellEditor: numberEditor },
    { headerName: "Price", field: "price" , editable: true , width: 130, cellEditor: numberEditor },
    { 
        cellClass: ['text-center'],
        headerName: "Count",
        field: "count",
        editable: true,
        width: 125, 
        // cellRenderer: cellRenderer,
        cellEditor: cellEditor,
    },
    { 
        headerName: "",
        width: 65,
        onCellClicked: (selected) => printProduct(selected.data),
        cellRenderer: () => '<i class="far fa-barcode-read text-blue-500"></i>',
        cellClass: ['hover:bg-gray-200' , 'text-center', 'active:bg-gray-300']
    },
    { 
        headerName: "",
        width: 65,
        onCellClicked: (selected) => deleteProduct(selected.data),
        cellRenderer: () => '<i class="fal fa-trash text-pink-500"></i>',
        cellClass: ['hover:bg-gray-200' , 'text-center', 'active:bg-gray-300']
    },
])

function printProduct(product){
    store.productName = null

    const copyProduct = { ...product }
    copyProduct.count = 1
    setTimeout(() => {
        store.productName = {
            name: productName.name,
            products: [copyProduct] 
        }
    })
}


function deleteProduct(selectProduct){
    tailwindSwal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
    }).then((result) => {
        if (result.isConfirmed) {
            axios.delete(`products/${selectProduct.id}`).then(() => {
                productAgGrid.api.applyTransaction({remove: [selectProduct]})
                productName.products = productName.products.filter((product) => product.id != selectProduct.id)

                refreshBaseTable(productName)
            })
        }
    })
}


function createProduct(size){
    const product = productName.products[productName.products.length - 1]


    const formData = {
        product_names_id: productName.id,
        size_id: size.id,
        original_price: product? product.original_price : 0,
        price: product? product.price : 0,
        count: 1,
    }
    axios.post('products', formData).then(({data}) => {
        productName.products.push(data)
        productAgGrid.api.applyTransaction({add: [data]})


        refreshBaseTable(productName)
    })
}

function cellValueChanged(row) {
    const selected = row.data
    axios.put(`products/${selected.id}`, selected).then(() => {
        refreshBaseTable(productName)
    })
}

function refreshBaseTable(productName){
    const rowNode = gridApi.getRowNode(productName.id)
    rowNode.setData(productName)
}


const productAgGrid: GridOptions = reactive({
    api: null,
    columnApi: null
})

function gridReady(grid){
    productAgGrid.api = grid.api
    productAgGrid.columnApi = grid.columnApi
}
</script>