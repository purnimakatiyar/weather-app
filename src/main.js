import { createApp } from 'vue'
import App from './App.vue'
import router from "./routers"
import './assets/tailwind.css'

createApp(App)
  .use(router)
  .mount('#app')
