import {createRouter, createWebHistory} from 'vue-router'  

const routes = [
  {
    path: "/",
    alias: "/penerima-manfaat",
    name: "penerima-manfaat",
    component: () => import("./components/PenerimaManfaatList.vue")
  },
  {
    path: "/add-penerima-manfaat",
    name: "add-penerima-manfaat",
    component: () => import("./components/AddPenerimaManfaat.vue")
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
export default router;