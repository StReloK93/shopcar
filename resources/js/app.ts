import { createApp } from 'vue'
import { createPinia } from 'pinia'


import App from './components/App.vue'
import './assets/app.css'
import './assets/select.css'
import router from './router'
import vSelect from './modules/select'
const pinia = createPinia()

createApp(App)
.component("vSelect", (vSelect))
.use(router)
.use(pinia)
.mount("#app")