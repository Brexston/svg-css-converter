
import type { App } from 'vue';
import { createPinia } from 'pinia';

import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'

import './styles/main.sass';

const app = createApp(App)

app.use(router).use(createPinia())
app.mount('#app')