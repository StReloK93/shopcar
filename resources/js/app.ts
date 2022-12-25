import { createApp } from 'vue'

import App from './components/App.vue'
import './assets/app.css'
import router from './router'

createApp(App)
.use(router)
.mount("#app")