import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import interceptor from './interceptor'
import hub from './hub'
createApp(App).use(store).use(router).use(interceptor).use(hub).mount('#app')
