import { createApp } from 'vue'
import App from './App.vue'
import log from 'electron-log'
Object.assign(console, log.functions);

createApp(App).mount('#app')
