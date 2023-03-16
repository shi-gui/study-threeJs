import { createRouter, createWebHashHistory } from "vue-router";
import { h, resolveComponent } from "vue";

const routes = [
  { path: "/", name: "Home", redirect: '/laochen/base/demo1' },
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
      {
        path: "base/demo2",
        name: "BaseDemo2",
        component: () => import("@/pages/laochen/base/demo2.vue"),
      },
      {
        path: "base/demo3",
        name: "BaseDemo3",
        component: () => import("@/pages/laochen/base/demo3.vue"),
      },
      {
        path: "base/demo4",
        name: "BaseDemo4",
        component: () => import("@/pages/laochen/base/demo4.vue"),
      },
      {
        path: "base/demo5",
        name: "BaseDemo5",
        component: () => import("@/pages/laochen/base/demo5.vue"),
      },
      {
        path: "base/demo6",
        name: "BaseDemo6",
        component: () => import("@/pages/laochen/base/demo6.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
