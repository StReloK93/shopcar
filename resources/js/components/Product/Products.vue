<template>
    <aside class="flex-grow flex flex-col">
        <section class="bg-white px-1 py-2 flex items-center justify-between">
            <main class="flex items-center">
                <label for="searchInput"></label><i class="fal fa-search text-sm mr-4 relative top-px"></i>
                <input 
                    @input="(event: any) => GridProduct.api.setQuickFilter(event.target.value)" 
                    id="searchInput"
                    type="text" class="py-0.5 bg-inherit w-full outline-none" placeholder="Izlash"
                >
            </main>
            <button @click="listStore.setListType(!listStore.type)" type="button" class="text-xl text-blue-600">
                <i class="fa-light fa-list-tree"></i>
            </button>
        </section>
        <section class="flex-grow">
            <AgGridVue
                class="h-full ag-theme-alpine"
                :headerHeight="30"
                :getRowId="(params) => params.data.id"
                :rowData="rowData"
                :columnDefs="columnDefs"
                @cellValueChanged="cellValueChanged"
                @gridReady="gridReady"
                :animateRows="true"
                :undoRedoCellEditing="true"
            ></AgGridVue>
        </section>
    </aside>
</template>
<script setup lang="ts">
import { ref , inject, onUnmounted} from "vue"
import { useListTypeStore } from '@/store/useListTypeStore'
import { useProductStore } from '../../store/useProductStore'
import cellEditor from '@/components/ForGrid/countEditor.vue'
import numberEditor from '@/components/ForGrid/numberEditor.vue'
import { GridProductStore } from '@/store/useGridProductStore'

const GridProduct = GridProductStore()
const listStore = useListTypeStore()

const { editable } = defineProps({
    editable: { type: Boolean, default: false },
})

const getProductById: Function = inject('getProductById', null)
const store = useProductStore()



const rowData = ref()
axios.get('products').then(({data}) => {
    rowData.value = data
})

const columnDefs = ref([
    { 
        suppressMovable: true,
        pinned: 'left',
        headerName: "ID",
        field: "id" ,
        width: 70 ,
    },
    { headerName: "Nomi", field: "product_names.name" , flex: 1, minWidth: 140},
    { headerName: "O'lchami", field: "size.name" , width: 80 },
    { headerName: "Tan narxi", field: "original_price", hide: editable == false,  editable: editable , width: 115 , cellEditor: numberEditor },
    { headerName: "Narxi", field: "price" , editable: editable , width: 115, cellEditor: numberEditor },
    { 
        headerName: "Soni",
        field: "count",
        editable: editable,
        width: 130, 
        cellEditor: cellEditor,
    },
    { headerName: "Kiritilgan sana", field: "created_at" , editable: editable , width: 115, cellRenderer: params => moment(params.value).fromNow() },
    { 
        suppressMovable: true,
        pinned: 'right',
        width: 50,
        headerName: "",
        onCellClicked: (selected) => printProduct(selected.data, 'productQrName'),
        cellRenderer: () => '<i class="fa-sharp fa-light fa-qrcode text-blue-500"></i>',
        cellClass: ['hover:bg-gray-200' , 'text-center', 'active:bg-gray-300']
    },
    { 
        suppressMovable: true,
        pinned: 'right',
        width: 50,
        headerName: "",
        onCellClicked: (selected) => printProduct(selected.data, 'productName'),
        cellRenderer: () => '<i class="far fa-barcode-read text-blue-500"></i>',
        cellClass: ['hover:bg-gray-200' , 'text-center', 'active:bg-gray-300']
    },
    { 
        suppressMovable: true,
        pinned: 'right',
        width: 50,
        hide: editable == false,
        headerName: "",
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
        onCellClicked: (selected) => getProductById(selected.data.id),
        cellRenderer: () => '<i class="fa-regular fa-bag-shopping text-orange-600"></i>',
        cellClass: ['hover:bg-gray-200' , 'text-center', 'active:bg-gray-300']
    },
])

function printProduct(product, name){
    store[name] = null

    const copyProduct = { ...product }
    copyProduct.count = 1
    setTimeout(() => {
        store[name] = {
            name: product.product_names.name,
            products: [copyProduct] 
        }
    })
}

function deleteProduct(selectProduct){
    if(editable == false) return
    swal.fire({
        title: "Aniq o'chirmoqchimisiz?",
        text: "Jarayonni orqaga qaytarib bo'lmaydi!",
        icon: 'warning',
    }).then((result) => {
        if (result.isConfirmed) axios.delete(`products/${selectProduct.id}`).then(() => {
            GridProduct.deleteRow(selectProduct)
        })
    })
}

function cellValueChanged(row) {
    if(editable == false) return
    const selected = row.data
    axios.put(`products/${selected.id}`, selected)
}

function gridReady(grid){
    GridProduct.api = grid.api
    GridProduct.columnApi = grid.columnApi
}
onUnmounted(() => {
    GridProduct.api = null
    GridProduct.columnApi = null
})
</script>
<style src="@/assets/ag-grid.css" scoped></style>