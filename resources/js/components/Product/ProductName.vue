<template>
    <section @click="$emit('close')" class="full-absolute z-[70] p-8">
        <main @click.stop class="h-full min-w-[630px] w-[900px] bg-white flex flex-col justify-between p-2">
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
                    <span class="font-semibold text-pink-500">{{ pageData.size_name }}</span>
                </span>
                <div v-if="editable" class="flex">
                    <button v-for="size in emptySizes" @click="createProduct(size)" class="mini-button ml-3 text-gray-600">
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
            <div v-if="editable" class="mt-3 text-right">
                <button @click="$emit('deleteProduct', productName)" class="py-1 px-3 bg-gray-200 shadow border-b-2 border-pink-500 active:bg-gray-300">
                    <i class="far fa-trash text-pink-500 mr-2"></i> Mahsulotni o'chirish
                </button>
            </div>
        </main>
    </section>
</template>

<script setup lang="ts">
import { GridApi } from "ag-grid-community"
import { GridOptions } from '../../interfaces/AgGridInterfaces'
import { ref , reactive , computed, inject } from "vue"
import { useProductStore } from '../../store/useProductStore'
import cellEditor from './countEditor.vue'
import numberEditor from './numberEditor.vue'

const emit = defineEmits(['close','deleteProduct'])

const { productName, gridApi , editable } = defineProps({
    productName: Object,
    gridApi: GridApi,
    editable: {
        type: Boolean,
        default: false
    }
})


const getProductById: Function = inject('getProductById', null)
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
    { headerName: "ID", field: "id" , width: 65  },
    { headerName: "O'lchami", field: "size.name" , flex: 1  },
    { headerName: "Tan narxi", field: "original_price", editable: true , width: 115 , cellEditor: numberEditor },
    { headerName: "Sotuv narxi", field: "price" , editable: true , width: 115, cellEditor: numberEditor },
    { 
        headerName: "Soni",
        field: "count",
        editable: true,
        width: 120, 
        cellEditor: cellEditor,
    },
    { headerName: "Kiritilgan sana", field: "created_at" , editable: true , width: 115, cellRenderer: params => moment(params.value).fromNow() },
    { 
        width: 50,
        headerName: "",
        onCellClicked: (selected) => printProduct(selected.data),
        cellRenderer: () => '<i class="fa-sharp fa-light fa-qrcode text-blue-500"></i>',
        cellClass: ['hover:bg-gray-200' , 'text-center', 'active:bg-gray-300']
    },
    { 
        width: 50,
        headerName: "",
        onCellClicked: (selected) => printProduct(selected.data),
        cellRenderer: () => '<i class="far fa-barcode-read text-blue-500"></i>',
        cellClass: ['hover:bg-gray-200' , 'text-center', 'active:bg-gray-300']
    },
    { 
        width: 50,
        headerName: "",
        hide: editable == false,
        onCellClicked: (selected) => deleteProduct(selected.data),
        cellRenderer: () => '<i class="fal fa-trash text-pink-500"></i>',
        cellClass: ['hover:bg-gray-200' , 'text-center', 'active:bg-gray-300']
    },
    { 
        suppressMovable: true,
        pinned: 'right',
        width: 50,
        hide: getProductById == null,
        headerName: "",
        onCellClicked: (selected) => {
            getProductById(selected.data.id)
            setTimeout(() => emit('close'), 250 )
            
        },
        cellRenderer: () => '<i class="fa-regular fa-bag-shopping text-orange-600"></i>',
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
    swal.fire({
        title: "Aniq o'chirmoqchimisiz?",
        text: "Jarayonni orqaga qaytarib bo'lmaydi!",
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
<style src="../../assets/ag-grid.css" scoped></style>