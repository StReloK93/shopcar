<template>
    <main class="flex-grow flex flex-col relative">
        <Transition name="fade">
            <Products 
                v-if="productName" 
                :gridApi="agGrid.api" 
                :productName="productName" 
                @close="productName = null"
                @deleteProduct="deleteProduct"
            />
        </Transition>


        <h3 class="flex items-center justify-between mb-2">
            <span class="font-bold text-xl text-gray-600">Products</span>
            <div class="flex items-center justify-between border-b px-2">
                <input @input="(event:any) => agGrid.api.setQuickFilter(event.target.value)" id="searchInput" type="text" class="py-0.5 bg-inherit w-32 outline-none" placeholder="Search">
                <label for="searchInput"></label><i class="fal fa-search text-sm relative top-px"></i>
            </div>
        </h3>

        <section class="flex-grow">
            <AgGridVue
                class="h-full ag-theme-alpine"
                :getRowId="(params) => params.data.id"
                :rowData="PageData.productNames"
                :columnDefs="columnDefs"
                :animateRows="true"
                @cellValueChanged="cellValueChanged"
                @gridReady="gridReady"
                :undoRedoCellEditing="true"
                :undoRedoCellEditingLimit="20"
            ></AgGridVue>
        </section>
        <!-- @rowDoubleClicked="opening" -->

    </main>
</template>

<script setup lang="ts">
import { useProductStore } from '../../store/useProductStore'
import { GridOptions } from '../../interfaces/AgGridInterfaces'
import { ref, reactive } from 'vue'
import Products from './Products.vue'

const emit = defineEmits(['gridReady'])
const { PageData } = defineProps(['PageData'])
const store = useProductStore()
const productName = ref(null)

const agGrid: GridOptions = reactive({
    api: null,
    columnApi: null
})

function opening(selected){
    productName.value = null
    setTimeout(() => productName.value = selected.data)
}

function gridReady(GridReady){

    agGrid.api = GridReady.api
    agGrid.columnApi = GridReady.columnApi
    emit('gridReady', GridReady.api)
}


function deleteProduct(selectedProductName){
    swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
    }).then((result) => {
        if (result.isConfirmed) {
            axios.delete(`productnames/${selectedProductName.id}`).then(() => {
                agGrid.api.applyTransaction({remove: [selectedProductName]})
                productName.value = null
            })
        }
    })
}


function cellValueChanged(event) {
    axios.put(`productnames/${event.data.id}`, event.data)
}


const columnDefs = ref([
    { 
        headerName: "Name", field: "name" , flex: 1, editable: true, 
    },
    { 
        sortable: true,
        resizable: true,
        headerName: "QTY",
        field: "products",
        width: 85,
        cellRenderer: params => params.value.reduce((summa, product) => summa + product.count, 0)
    },
    { 
        sortable: true,
        headerName: "Category", field: "category.name" , width: 120 
    },
    { 
        sortable: true,
        headerName: "Created", field: "created_at" , width: 120, cellRenderer: params => moment(params.value).fromNow()
    },

    { 
        suppressMovable: true,
        pinned: 'right',
        headerName: "",
        width: 60,
        cellClass: ['hover:bg-white', 'cursor-pointer' ,'text-center'],
        cellRenderer: () => '<i class="far fa-barcode-read text-blue-500"></i>',
        onCellClicked: (selected) => {
            store.productName = null
            setTimeout(() => store.productName = selected.data)
        }
    },
    { 

        suppressMovable: true,
        pinned: 'right',
        headerName: "",
        width: 60,
        cellClass: ['hover:bg-white', 'cursor-pointer' ,'text-center'],
        cellRenderer: () => '<i class="fal fa-folder-open text-blue-500"></i>',
        onCellClicked: (selected) => opening(selected),
    },
])
</script>
<style src="../../assets/ag-grid.css"></style>