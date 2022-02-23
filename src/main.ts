import { createApp } from 'vue'
import App from './App.vue'
import log from 'electron-log'
import { store } from './store'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import router from './router'

Object.assign(console, log.functions);

const app = createApp(App)
app.use(router)
app.use(Antd)
app.use(store)
app.mount('#app')
