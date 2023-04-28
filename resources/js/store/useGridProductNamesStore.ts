import { defineStore } from "pinia"
import { GridApi, ColumnApi } from "ag-grid-community"

import { ref, Ref } from "vue"
export const GridProductNamesStore = defineStore('GridProductNames', () => {

    const api:Ref<GridApi> = ref(null)
    const columnApi: Ref<ColumnApi> = ref(null)

    function addRow(data){
        api.value.applyTransaction({ add: [data], addIndex: 0 })
    }

    function updateSale(product){
        const rowNode = api.value.getRowNode(product.product_names_id)
        const selectedProduct = rowNode.data.products.find(prod => product.product_id == prod.id)

        const remainder = selectedProduct.count - product.count
        if(remainder == 0) rowNode.data.products = rowNode.data.products.filter(prod => product.product_id != prod.id)
        
        else{
            rowNode.data.products.forEach(prod => {
                if(prod.id == product.product_id) prod.count = remainder
            })
        }
        rowNode.setData(rowNode.data)
    }

    function update(productName){
        const rowNode = api.value.getRowNode(productName.id)
        rowNode.setData(productName)
    }

    return { api, columnApi, addRow, update , updateSale }
})