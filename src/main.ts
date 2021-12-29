import { createApp } from 'vue'
import App from './App.vue'
import log from 'electron-log'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { store } from './store'
import * as ElIconModules from '@element-plus/icons-vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

Object.assign(console, log.functions);

const app = createApp(App)
for (const iconName in ElIconModules) {
    if (Reflect.has(ElIconModules, iconName)) {
        const item = ElIconModules[iconName]
        app.component(iconName, item)
    }
}
app.use(ElementPlus)
app.use(Antd)
app.use(store)
app.mount('#app')
