//import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { createApp } from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import "primevue/resources/themes/lara-light-green/theme.css"
import "primevue/resources/primevue.min.css" /* Deprecated */
import PrimeVue from "primevue/config"
/* eslint-disable */ 
import Dropdown from 'primevue/dropdown'
import "./style.css"

const app = createApp(App)
app.config.productionTip = false
app.use(PrimeVue)
app.use(router)
app.use(VueAxios,axios)

app.component('Dropdown', Dropdown)

app.mount('#app')