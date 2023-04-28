<template>
    <aside class="flex flex-col">
        <TransitionGroup name="fade">
            <RefundListProducts 
                v-if="PageData.editSold != null"
                @close="PageData.editSold = null"
                @deleted="deleted"
                @backup="backup"
                :product="PageData.editSold"
            />
        </TransitionGroup>
        <section class="bg-white px-1 py-2 flex items-center">
            <label for="searchInput"></label><i class="fal fa-search text-sm mr-4 relative top-px"></i>
            <input 
                @input="(event: any) => GridSold.api.setQuickFilter(event.target.value)" 
                id="searchInput"
                type="text" class="py-0.5 bg-inherit w-full outline-none" placeholder="Izlash"
            >
        </section>
        <section class="flex-grow">
            <AgGridVue class="h-full ag-theme-alpine w-full" :headerHeight="30" :getRowId="(params) => params.data.id"
                :rowData="PageData.sells" :columnDefs="PageData.columnDefs" :animateRows="true" @gridReady="gridReady">
            </AgGridVue>
        </section>
    </aside>
</template>
<script setup lang="ts">
import RefundListProducts from '../components/RefundListProducts.vue'
import { GridSoldStore } from '@/store/useGridSoldStore'
import { onUnmounted, reactive } from 'vue'
import { sumSale } from '@/store/useSumSaleStore'
const saleStore = sumSale()

const GridSold = GridSoldStore()

axios.get('sale').then(({ data }) => PageData.sells = data)

const PageData = reactive({
    sells: null,
    editSold: null,
    columnDefs: [
        {
            headerName: 'Mahsulotlar',
            flex: 1 ,
            sortable: true ,
            cellRenderer:  params => {
                var text = ""

                
                params.data.sells.forEach(selled_product => {
                    var counting = selled_product.count > 1 ? `<span class="text-[10px] text-pink-500 mr-0.5">${selled_product.count}x </span>` : ''
                    const tag = `
                    <div class="inline-block mr-4 ">
                        <span class="bg-gray-100 px-2 py-0.5 border-b border-pink-500">
                            <span>${selled_product.product_names.name}</span>
                            <span class="ml-4 text-gray-400"> ${counting} ${selled_product.size.name}</span>
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
            cellRenderer: () => "<i class='fa-duotone fa-pen-nib text-pink-600 text-[16px] relative top-px'></i>",
            onCellClicked: (selected) => editSold(selected.data),
            cellClass: ['hover:bg-gray-200' , 'text-center', 'active:bg-gray-300', 'bg-gray-100']
        },

        
    ]
})

function backup(sale){
    if(sale == false){
        GridSold.api.applyTransaction({remove: [PageData.editSold]})
        PageData.editSold = null
    }
    else{
        const rowNode = GridSold.api.getRowNode(sale.id)
        rowNode.setData(sale)
        PageData.editSold = null
    }
    saleStore.getDayInfo()
}


function editSold(selected){
    PageData.editSold = selected
}

function deleted(selectSale){
    GridSold.api.applyTransaction({remove: [selectSale]})
}

function gridReady(grid) {
    GridSold.api = grid.api
    GridSold.columnApi = grid.columnApi
}

onUnmounted(() => {
    GridSold.api = null
    GridSold.columnApi = null
})
</script>
<style src="@/assets/ag-grid.css" scoped></style>