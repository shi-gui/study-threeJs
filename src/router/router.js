import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/index1",
    name: "index1",
    meta: { title: "车场排名", tag: true },
    component: () => import("@/pages/index1.vue"),
  },
  {
    path: "/index2",
    name: "index2",
    meta: { title: "车场排名", tag: true },
    component: () => import("@/pages/index2.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
