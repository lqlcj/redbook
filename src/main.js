// src/main.js

import { createApp } from 'vue';
import { createPinia } from 'pinia'; // 引入 createPinia
import App from './App.vue';
import router from './router';

// 创建 Pinia 实例
const pinia = createPinia();

const app = createApp(App);

app.use(pinia); // 挂载 Pinia
app.use(router);

app.mount('#app');