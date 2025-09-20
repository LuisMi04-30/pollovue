import { createRouter, createWebHashHistory } from "vue-router"; // 👈 hash
import HomeView from "@/views/HomeView.vue";
import PedidoView from "@/views/PedidoView.vue";
import PolloView from "@/views/PolloView.vue";

export default createRouter({
  history: createWebHashHistory(),     // 👈 importante para GH Pages
  routes: [
    { path: "/", name: "home", component: HomeView },
    { path: "/pedido", name: "pedido", component: PedidoView },
    { path: "/pollo", name: "pollo", component: PolloView },
    { path: "/:pathMatch(.*)*", redirect: "/" },
  ],
  scrollBehavior: () => ({ top: 0 }),
});