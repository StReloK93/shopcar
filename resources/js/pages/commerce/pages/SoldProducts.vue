<template>
    <aside class="flex flex-col">
        <section class="bg-white p-1 flex items-center">
            <label for="searchInput"></label><i class="fal fa-search text-sm mr-4 relative top-px"></i>
            <input 
                @input="(event: any) => SellAgGrid.api.setQuickFilter(event.target.value)" 
                id="searchInput"
                type="text" class="py-0.5 bg-inherit w-full outline-none" placeholder="Izlash"
            >
        </section>
        <section class="flex-grow">
            <AgGridVue class="h-full ag-theme-alpine w-full " :getRowId="(params) => params.data.id"
                :rowData="PageData.sells" :columnDefs="PageData.columnDefs" :animateRows="true" @gridReady="gridReady">
            </AgGridVue>
        </section>
    </aside>
</template>

<script setup lang="ts">
import { GridOptions } from '@/interfaces/AgGridInterfaces'
import { reactive } from 'vue'

axios.get('sells').then(({ data }) => PageData.sells = data)

const PageData = reactive({
    sells: null,
    columnDefs: [
        { field: 'product_names.name', headerName: 'Nomi', flex: 1 },
        { field: 'size.name', headerName: "O'lchami", width: 80, },
        { field: 'price', headerName: 'Narxi', width: 130, },
        { field: 'sold_price', headerName: 'Sotilgan narxi', width: 130, },
        { field: 'count', headerName: 'Soni', width: 80 },
        { field: 'count', headerName: 'Summa', width: 140 , headerClass: ['bg-gray-100'], cellClass: ['bg-gray-100', 'font-semibold'] , cellRenderer: ({data}) => Math.round(data.sold_price * data.count*1000)/1000 },
        { field: 'created_at', headerName: 'Sotilgan vaqt', width: 140, cellRenderer: params => moment(params.value).fromNow() },
        { 
            headerName: '',
            width: 50,
            cellRenderer: () => "<i class='fa-brands fa-rev text-xl relative top-px text-blue-500'></i>",
            // onCellClicked: (selected) => getProductById(selected.data.id),
            cellClass: ['hover:bg-gray-200' , 'text-center', 'active:bg-gray-300']
        },

        
    ]
})

const SellAgGrid: GridOptions = reactive({ api: null, columnApi: null })
function gridReady(grid) {
    SellAgGrid.api = grid.api
    SellAgGrid.columnApi = grid.columnApi
}

defineExpose({ SellAgGrid })
</script>