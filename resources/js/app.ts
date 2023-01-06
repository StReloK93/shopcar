import { createApp } from 'vue'

import App from './components/App.vue'
import './assets/app.css'
import './assets/select.css'
import router from './router'
import vSelect from './modules/select'
createApp(App)
.component("vSelect", (vSelect))
.use(router)
.mount("#app")