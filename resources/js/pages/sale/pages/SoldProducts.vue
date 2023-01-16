<template>
    <AgGridVue
        class="h-full ag-theme-alpine w-full"
        :getRowId="(params) => params.data.id"
        :rowData="PageData.sells"
        :columnDefs="PageData.columnDefs"
        :animateRows="true"
        @gridReady="gridReady"
    ></AgGridVue>
</template>

<script setup lang="ts">
import { GridOptions } from '../../../interfaces/AgGridInterfaces'
import { reactive } from 'vue'

axios.get('sells').then(({data}) => PageData.sells = data)

const PageData = reactive({
    sells: null,
    columnDefs: [
        { field: 'product_names.name', headerName: 'Nomi' , flex: 1},
        { field: 'size.name' , headerName: 'Hajmi', width: 80, },
        { field: 'price' , headerName: 'Narxi' },
        { field: 'sold_price' , headerName: 'Sotilgan narxi'},
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