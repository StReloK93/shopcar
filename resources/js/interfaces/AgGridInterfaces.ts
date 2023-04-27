import { GridApi, ColumnApi } from "ag-grid-community";


export interface GridOptions {
    api: GridApi | null,
    columnApi: ColumnApi | null,
}

export interface Sale {
    id?: Number | null,
    shop_id: Number | null,
    cash: Number | null,
    electron: Number | null,
    debt: Number | null,
    created_at: Date,
    updated_at: Date,
}

export interface SummSale {
    cash: Number | null,
    electron: Number | null,
    debt: Number | null,
}