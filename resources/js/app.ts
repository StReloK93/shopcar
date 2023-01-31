// Globals //
import axios from './modules/axios'
import SweetAlert2 from './modules/swal'
import moment from '@/modules/moment'
import i18n from "@/modules/localization"


window.axios = axios
window.moment = moment
window.swal = SweetAlert2
import './assets/app.css'
import './assets/select.css'
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.min.css"
// Globals //


import { AgGridVue } from 'ag-grid-vue3'
import vSelect from './modules/select'
import App from './App.vue'


import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import { useAuthStore } from './store/useAuthStore'

const pinia = createPinia()



const app = createApp(App)
app.component("AgGridVue", (AgGridVue))
app.component("vSelect", (vSelect))
app.use(i18n)
app.use(pinia)

const store = useAuthStore()

store.getUser().then(async () => {
    app.use(router)
    app.mount("#app")
})

