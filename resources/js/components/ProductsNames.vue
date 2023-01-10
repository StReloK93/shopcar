<template>
    <main class="flex-grow ml-3 border-l border-gray-300 px-3 flex flex-col">
        <h3 class="font-bold text-xl mb-2 text-gray-600">
            Products
        </h3>
        <section v-if="PageData.productNames.length" class="flex-grow">
            <AgGridVue
                class="h-full ag-theme-alpine"
                :rowData="PageData.productNames"
                :columnDefs="columnDefs"
                @rowClicked="rowSelected"
            ></AgGridVue>
        </section>
    </main>
</template>

<script setup lang="ts">
import { useProductStore } from '../store/ProductPrint'
import { ref } from 'vue'
import moment from 'moment'
const { PageData } = defineProps(['PageData'])
const { $state } = useProductStore()


function rowSelected(selected){
    $state.productName = null

    setTimeout(() => $state.productName = selected.data)
    
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
])
</script>