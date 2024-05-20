import Vue from "vue";
import VueRouter from "vue-router";

import Reservas from "@/components/ReservasJunta.vue";
import Horario from "@/components/Horario.vue";

Vue.useAttrs(VueRouter);

const routes = [
  { path: "/", name: "Horario", component: Horario },
  { path: "/", name: "Reservas", component: Reservas },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
