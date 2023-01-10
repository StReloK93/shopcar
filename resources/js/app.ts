import './assets/app.css'
import './assets/select.css'
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.min.css"

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { AgGridVue } from 'ag-grid-vue3'


import App from './components/App.vue'
import vSelect from './modules/select'

import router from './router'
const pinia = createPinia()

createApp(App)
.component("AgGridVue", (AgGridVue))
.component("vSelect", (vSelect))
.use(router)
.use(pinia)
.mount("#app")