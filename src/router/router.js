import { createRouter, createWebHashHistory } from "vue-router";
import { h, resolveComponent } from "vue";

const routes = [
  { path: "/", name: "Home", render: () => h(resolveComponent("router-view")) },
  {
    path: "/laochen/",
    name: "LaoChen",
    render: () => h(resolveComponent("router-view")),
    children: [
      {
        path: "base/demo1",
        name: "BaseDemo1",
        component: () => import("@/pages/laochen/base/demo1.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
