<template>
    <main class="flex flex-col h-full">
        <h3 class="flex items-center justify-between mb-2">
            <span class="font-bold text-xl text-gray-600">Sotilgan mahsulotlar</span>
            <div class="flex items-center justify-between border-b px-2">
                <input @input="(event:any) => SellAgGrid.api.setQuickFilter(event.target.value)" id="searchInput" type="text" class="py-0.5 bg-inherit w-32 outline-none" placeholder="Izlash">
                <label for="searchInput"></label><i class="fal fa-search text-sm relative top-px"></i>
            </div>
        </h3>
        <section class="flex-grow">
            <AgGridVue
                class="h-full ag-theme-alpine w-full"
                :getRowId="(params) => params.data.id"
                :rowData="PageData.sells"
                :columnDefs="PageData.columnDefs"
                :animateRows="true"
                @gridReady="gridReady"
            ></AgGridVue>
        </section>
    </main>
</template>

<script setup lang="ts">
import { GridOptions } from '../../../interfaces/AgGridInterfaces'
import { reactive } from 'vue'

axios.get('sells').then(({data}) => PageData.sells = data)

const PageData = reactive({
    sells: null,
    columnDefs: [
        { field: 'product_names.name', headerName: 'Nomi' , flex: 1 },
        { field: 'size.name' , headerName: "O'lchami", width: 80, },
        { field: 'price' , headerName: 'Narxi' },
        { field: 'sold_price' , headerName: 'Sotilgan narxi' },
        { field: 'count' , headerName: 'Soni'},
        { field: 'created_at', headerName: 'Sotilgan vaqt' , cellRenderer: params => moment(params.value).fromNow() },
    ]
})

const SellAgGrid: GridOptions = reactive({api: null,columnApi: null})
function gridReady(grid){
    SellAgGrid.api = grid.api
    SellAgGrid.columnApi = grid.columnApi
}


defineExpose({SellAgGrid})
</script>