import { defineStore } from "pinia"
import { GridApi, ColumnApi } from "ag-grid-community"

import { ref, Ref } from "vue"
export const GridProductStore = defineStore('GridProduct', () => {

    const api:Ref<GridApi> = ref(null)
    const columnApi: Ref<ColumnApi> = ref(null)

    function addRow(data){
        api.value.applyTransaction({ add: data.products, addIndex: 0 })
    }

    function updateSale(product){
        const rowNode = api.value.getRowNode(product.product_id)
        const remainder = rowNode.data.count - product.count

        if(remainder == 0) api.value.applyTransaction({remove: [rowNode.data]})
        else{
            rowNode.data.count = remainder
            rowNode.setData(rowNode.data)
        }
    }

    function deleteRow(product){
        api.value.applyTransaction({remove: [product]})
    }


    return { api, columnApi, addRow , deleteRow , updateSale }
})