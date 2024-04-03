import './assets/main.scss'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createPinia } from 'pinia';
import {createPersistedState} from "pinia-persistedstate-plugin";

const app = createApp(App)
const pinia = createPinia();
const persistedState = createPersistedState();

pinia.use(persistedState)
app.use(router)
app.use(ElementPlus)
app.mount('#app')
app.use(pinia);



