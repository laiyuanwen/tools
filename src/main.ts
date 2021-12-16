import { createApp } from 'vue'
import App from './App.vue'
import log from 'electron-log'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { store } from './store'

Object.assign(console, log.functions);

const app = createApp(App)
app.use(ElementPlus)
app.use(store)
app.mount('#app')
