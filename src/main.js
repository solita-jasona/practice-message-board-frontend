import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import interceptor from './interceptor'
createApp(App).use(store).use(router).use(interceptor).mount('#app')
