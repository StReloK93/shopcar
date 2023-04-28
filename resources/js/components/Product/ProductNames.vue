<template>
    <main class="flex-grow flex flex-col">
        <Transition name="fade">
            <ProductName 
                v-if="productName" 
                :productName="productName"
                :editable="editable"
                @close="productName = null"
                @deleteProduct="deleteProduct"
            />
        </Transition>
        <section class="bg-white px-1 py-2 flex items-center justify-between">
            <main class="flex items-center">
                <label for="searchInput"></label><i class="fal fa-search text-sm mr-4 relative top-px"></i>
                <input 
                    @input="(event: any) => GridProductNames.api.setQuickFilter(event.target.value)" 
                    id="searchInput"
                    type="text" class="py-0.5 bg-inherit w-full outline-none" placeholder="Izlash"
                >
            </main>
            <main class="flex items-center">
                <div class="mr-10 flex text-gray-500 items-center">
                    <article>
                        <label for="alls" 
                            class="flex items-center px-1 border-b border-transparent" 
                            :class="{'text-pink-500 !border-pink-300': filter == 'all'}"
                        >
                            Barchasi
                        </label>
                        <input hidden id="alls" type="radio" name="filte" @change="GridProductNames.api.onFilterChanged()" v-model="filter" value="all">
                    </article>
                    <article class="mx-2">
                        <label for="contains" 
                            class="flex items-center px-1 border-b border-transparent" 
                            :class="{'text-pink-500 !border-pink-300': filter == 'contain'}"
                        >
                            Mavjud
                        </label>
                        <input hidden id="contains" type="radio" name="filte" @change="GridProductNames.api.onFilterChanged()" v-model="filter" value="contain">
                    </article>
                    <article>
                        <label for="emptys"
                            class="flex items-center px-1 border-b border-transparent" 
                            :class="{'text-pink-500 !border-pink-300': filter == 'empty'}"
                        >
                            Qolmagan
                        </label>
                        <input hidden id="emptys" type="radio" name="filte" @change="GridProductNames.api.onFilterChanged()" v-model="filter" value="empty">
                    </article>
                </div>
                <button @click="listStore.setListType(!listStore.type)" type="button" class="text-xl text-blue-600">
                    <i class="fa-regular fa-list-ul"></i>
                </button>
            </main>
        </section>
        <section class="flex-grow">
            <AgGridVue
                class="h-full ag-theme-alpine"
                :headerHeight="30"
                :getRowId="(params) => params.data.id"
                :rowData="ProductNames"
                :columnDefs="columnDefs"
                :animateRows="true"
                @cellValueChanged="cellValueChanged"
                @gridReady="gridReady"
                :undoRedoCellEditing="true"
                :undoRedoCellEditingLimit="20"
                :doesExternalFilterPass="doesExternalFilterPass"
                :isExternalFilterPresent="() => filter != 'all'"
            ></AgGridVue>
        </section>
    </main>
</template>

<script setup lang="ts">
import { GridProductNamesStore } from '@/store/useGridProductNamesStore'
import { useProductStore } from '@/store/useProductStore'
import { useListTypeStore } from '@/store/useListTypeStore'
import ProductName from './ProductName.vue'
import { ref , onUnmounted } from 'vue'


const { editable} = defineProps(['editable'])

const filter = ref('contain')

const ProductNames = ref(null)
axios.get('productnames').then(({data}) => ProductNames.value = data)


const GridProductNames = GridProductNamesStore()
const listStore = useListTypeStore()
const store = useProductStore()


const productName = ref(null)

function opening(selected){
    productName.value = null
    setTimeout(() => productName.value = selected.data)
}



function deleteProduct(selectedProductName){
    swal.fire({
        title: "Aniq o'chirmoqchimisiz?",
        text: "Jarayonni orqaga qaytarib bo'lmaydi!",
        icon: 'warning',
    }).then((result) => {
        if (result.isConfirmed) {
            axios.put(`productnames/delete/${selectedProductName.id}`, selectedProductName).then(() => {
                if(selectedProductName.sells_sum_count){
                    const rowNode = GridProductNames.api.getRowNode(selectedProductName.id)
                    selectedProductName.products = []
                    rowNode.setData(selectedProductName)
                }
                else GridProductNames.api.applyTransaction({remove: [selectedProductName]})

                productName.value = null
            })
        }
    })
}

function doesExternalFilterPass(node){
    
    const count = node.data.products.reduce((summa, product) => summa + product.count, 0)
    
    if (filter.value == 'empty') return count == 0
    else if(filter.value == 'contain') return count != 0
    else return true
    
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
        width: 50,
        headerName: "",
        onCellClicked: (selected) => {
            store.productQrName = null
            setTimeout(() => store.productQrName = selected.data)
        },
        cellRenderer: () => '<i class="fa-sharp fa-light fa-qrcode text-blue-500"></i>',
        cellClass: ['hover:bg-gray-200' , 'text-center', 'active:bg-gray-300']
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

function gridReady(GridReady){
    GridProductNames.api = GridReady.api
    GridProductNames.columnApi = GridReady.columnApi
}

onUnmounted(() => {
    GridProductNames.api = null
    GridProductNames.columnApi = null
})
</script>
<style src="@/assets/ag-grid.css" scoped></style>