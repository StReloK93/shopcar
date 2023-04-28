import { defineStore } from "pinia"
import { GridApi, ColumnApi } from "ag-grid-community"
import { ref, Ref } from "vue"
export const GridSoldStore = defineStore('GridSold', () => {
    const api:Ref<GridApi> = ref(null)
    const columnApi: Ref<ColumnApi> = ref(null)

    function addRow(sale){
        api.value.applyTransaction({add: [sale],addIndex: 0})
    }

    return { api, columnApi, addRow }
})