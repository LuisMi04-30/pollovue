import { createRouter, createWebHistory } from "vue-router";

import HomeView from "@/views/HomeView.vue";
import PedidoView from "@/views/PedidoView.vue";
import PolloView from "@/views/PolloView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "home", component: HomeView },
    { path: "/pedido", name: "pedido", component: PedidoView },
    { path: "/pollo", name: "pollo", component: PolloView },
    { path: "/:pathMatch(.*)*", redirect: "/" }, // catch-all
  ],
});

export default router;
