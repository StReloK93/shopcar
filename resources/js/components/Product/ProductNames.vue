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
        <section class="bg-white py-1 px-2 flex items-center">
            <label for="searchInput"></label><i class="fal fa-search text-sm mr-4 relative top-px"></i>
            <input 
                @input="(event: any) => agGrid.api.setQuickFilter(event.target.value)" 
                id="searchInput"
                type="text" class="py-0.5 bg-inherit w-full outline-none" placeholder="Izlash"
            >
        </section>
        <section class="flex-grow">
            <AgGridVue
                class="h-full ag-theme-alpine"
                :getRowId="(params) => params.data.id"
                :rowData="ProductNames"
                :columnDefs="columnDefs"
                :animateRows="true"
                @cellValueChanged="cellValueChanged"
                @gridReady="gridReady"
                :undoRedoCellEditing="true"
                :undoRedoCellEditingLimit="20"
            ></AgGridVue>
        </section>
    </main>
</template>

<script setup lang="ts">
import { useProductStore } from '@/store/useProductStore'
import { GridOptions } from '@/interfaces/AgGridInterfaces'
import { ref, reactive } from 'vue'
import Products from './ProductName.vue'

const ProductNames = ref(null)
axios.get('productnames').then(({data}) => ProductNames.value = data)



const store = useProductStore()
const productName = ref(null)

const agGrid: GridOptions = reactive({api: null,columnApi: null})
defineExpose({agGrid})

function opening(selected){
    productName.value = null
    setTimeout(() => productName.value = selected.data)
}

function gridReady(GridReady){
    agGrid.api = GridReady.api
    agGrid.columnApi = GridReady.columnApi
}


function deleteProduct(selectedProductName){
    swal.fire({
        title: "Aniq o'chirmoqchimisiz?",
        text: "Jarayonni orqaga qaytarib bo'lmaydi!",
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
        headerName: "Nomi", field: "name" , flex: 1, editable: true, 
    },
    { 
        sortable: true,
        resizable: true,
        headerName: "Soni",
        field: "products",
        width: 85,
        cellRenderer: params => params.value.reduce((summa, product) => summa + product.count, 0)
    },
    { 
        sortable: true,
        headerName: "Turi", field: "category.name" , width: 120 
    },
    { 
        sortable: true,
        headerName: "Kiritilgan vaqt", field: "created_at" , width: 120, cellRenderer: params => moment(params.value).fromNow()
    },

    { 
        suppressMovable: true,
        pinned: 'right',
        headerName: "",
        width: 50,
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
        width: 50,
        cellClass: ['hover:bg-white', 'cursor-pointer' ,'text-center'],
        cellRenderer: () => '<i class="fal fa-folder-open text-blue-500"></i>',
        onCellClicked: (selected) => opening(selected),
    },
])
</script>
<style src="../../assets/ag-grid.css"></style>