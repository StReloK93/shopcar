<template>
    <main class="flex-grow ml-3 border-l border-gray-300 px-3 flex flex-col relative">
        <Transition name="fade">
            <Products v-if="productName" :productName="productName" @close="productName = null"/>
        </Transition>
        <h3 class="font-bold text-xl mb-2 text-gray-600">
            Products
        </h3>
        <section v-if="PageData.productNames.length" class="flex-grow">
            <AgGridVue
                class="h-full ag-theme-alpine"
                :rowData="PageData.productNames"
                :columnDefs="columnDefs"
                @rowDoubleClicked="opening"
            ></AgGridVue>
        </section>
    </main>
</template>

<script setup lang="ts">
// @ts-ignore
import moment from "moment";
import { useProductStore } from '../../store/ProductPrint'
import { ref } from 'vue'
import Products from './Products.vue'

const { PageData } = defineProps(['PageData'])
const { $state } = useProductStore()
const productName = ref(null)


function opening(selected){
    productName.value = null
    setTimeout(() => productName.value = selected.data)
}



const columnDefs = ref([
    { headerName: "Name", field: "name" , flex: 1},
    { 
        headerName: "Products", field: "products" , cellRenderer: params => params.value.reduce((summa, product) => summa + product.count, 0)
    },
    { 
        headerName: "Created", field: "created_at" , cellRenderer: params => {
            return moment(params.value).fromNow()
        }
    },
    { 
        headerName: "Barcode",
        width: 100,
        cellClass: ['hover:bg-white', 'cursor-pointer' ,'text-center'],
        cellRenderer: () => '<i class="far fa-barcode-read text-blue-500"></i>',
        onCellClicked: (selected) => {
            $state.productName = null
            setTimeout(() => $state.productName = selected.data)
        }
    },
    { 
        headerName: "Open",
        width: 80,
        cellClass: ['hover:bg-white', 'cursor-pointer' ,'text-center'],
        cellRenderer: () => '<i class="fal fa-folder-open text-blue-500"></i>',
        onCellClicked: (selected) => opening(selected)
    },
])
</script>