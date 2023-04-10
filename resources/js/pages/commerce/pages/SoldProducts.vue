<template>
    <aside class="flex flex-col">
        <section class="bg-white px-1 py-2 flex items-center">
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
const emit = defineEmits(['editSold'])
axios.get('sale').then(({ data }) => PageData.sells = data)

const PageData = reactive({
    sells: null,
    columnDefs: [
        {
            headerName: 'Mahsulotlar',
            flex: 1 ,
            sortable: true ,
            cellRenderer:  params => {
                var text = ""
                params.data.sells.forEach(selled_product => {
                    const tag = `
                    <div class="inline-block mr-4 ">
                        <span class="bg-gray-100 px-2 py-0.5 border-b border-pink-500">
                            <span>${selled_product.product_names.name}</span>
                            <span class="ml-4 text-gray-400">${selled_product.size.name}</span>
                        </span>
                    </div>`
                    text += tag
                });
                return text
            }
        },
        { field: 'cash', headerName: 'Naxt', width: 130, },
        { field: 'electron', headerName: 'Plastik', width: 130, },
        { field: 'debt', headerName: 'Qarz', width: 80 },
        { 
            field: 'count',
            headerName: 'Summa',
            width: 140 ,
            headerClass: ['bg-gray-100'], cellClass: ['bg-gray-100', 'font-semibold'] ,
            cellRenderer: ({data}) => data.cash + data.electron + data.debt
        },
        { field: 'created_at', headerName: 'Sotilgan vaqt', width: 140, cellRenderer: params => moment(params.value).fromNow() },
        { 
            headerName: '',
            width: 50,
            cellRenderer: () => "<i class='fa-duotone fa-marker text-pink-600 text-[16px] relative top-px'></i>",
            onCellClicked: (selected) => editSold(selected.data),
            cellClass: ['hover:bg-gray-200' , 'text-center', 'active:bg-gray-300', 'bg-gray-100']
        },

        
    ]
})

function editSold(selected){
    emit('editSold', selected)
}

const SellAgGrid: GridOptions = reactive({ api: null, columnApi: null })
function gridReady(grid) {
    SellAgGrid.api = grid.api
    SellAgGrid.columnApi = grid.columnApi
}

defineExpose({ SellAgGrid })
</script>