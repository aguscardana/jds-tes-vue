import App from './App.vue'
import router from './router'
import { createApp } from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import "./style.css"

const app = createApp(App)
app.config.productionTip = false
app.use(router)
app.use(VueAxios,axios)

app.mount('#app')