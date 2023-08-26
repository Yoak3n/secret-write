import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

const app = createApp(App)

import pinia from './store/index';
app.use(pinia);

import router from './router/index'
app.use(router)
app.mount('#app')
