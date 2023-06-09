import { createRouter, createWebHashHistory } from "vue-router";
import { h, resolveComponent } from "vue";

const routes = [
  { path: "/", name: "Home", redirect: "/laochen/base/demo1" },
  {
    path: "/laochen/",
    name: "LaoChen",
    render: () => h(resolveComponent("router-view")),
    children: [
      // base
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
      {
        path: "base/demo7",
        name: "BaseDemo7",
        component: () => import("@/pages/laochen/base/demo7.vue"),
      },
      {
        path: "base/demo8",
        name: "BaseDemo8",
        component: () => import("@/pages/laochen/base/demo8.vue"),
      },
      {
        path: "base/demo9",
        name: "BaseDemo9",
        component: () => import("@/pages/laochen/base/demo9.vue"),
      },
      {
        path: "base/demo10",
        name: "BaseDemo10",
        component: () => import("@/pages/laochen/base/demo10.vue"),
      },
      // advace
      {
        path: "advace/demo1",
        name: "AdvaceDemo1",
        component: () => import("@/pages/laochen/advace/demo1.vue"),
      },
      {
        path: "advace/demo2",
        name: "AdvaceDemo2",
        component: () => import("@/pages/laochen/advace/demo2.vue"),
      },
      {
        path: "advace/demo3",
        name: "AdvaceDemo3",
        component: () => import("@/pages/laochen/advace/demo3.vue"),
      },
      {
        path: "advace/demo4",
        name: "AdvaceDemo4",
        component: () => import("@/pages/laochen/advace/demo4.vue"),
      },
      {
        path: "advace/demo5",
        name: "AdvaceDemo5",
        component: () => import("@/pages/laochen/advace/demo5.vue"),
      },
      {
        path: "advace/demo6",
        name: "AdvaceDemo6",
        component: () => import("@/pages/laochen/advace/demo6.vue"),
      },
      {
        path: "advace/demo7",
        name: "AdvaceDemo7",
        component: () => import("@/pages/laochen/advace/demo7.vue"),
      },
      {
        path: "advace/demo8",
        name: "AdvaceDemo8",
        component: () => import("@/pages/laochen/advace/demo8.vue"),
      },
      {
        path: "advace/demo9",
        name: "AdvaceDemo9",
        component: () => import("@/pages/laochen/advace/demo9.vue"),
      },
      {
        path: "advace/demo10",
        name: "AdvaceDemo10",
        component: () => import("@/pages/laochen/advace/demo10.vue"),
      },
      // light
      {
        path: "light/demo1",
        name: "LightDemo1",
        component: () => import("@/pages/laochen/light/demo1.vue"),
      },
      {
        path: "light/demo2",
        name: "LightDemo2",
        component: () => import("@/pages/laochen/light/demo2.vue"),
      },
      {
        path: "light/demo3",
        name: "LightDemo3",
        component: () => import("@/pages/laochen/light/demo3.vue"),
      },
      {
        path: "light/demo4",
        name: "LightDemo4",
        component: () => import("@/pages/laochen/light/demo4.vue"),
      },
      // example
      {
        path: "example/vrToHouse",
        name: "VrToHouse",
        component: () =>
          import("@/pages/laochen/example/VrToHouse/VrToHouse.vue"),
      },
      {
        path: "example/islandScenery",
        name: "IslandScenery",
        component: () =>
          import("@/pages/laochen/example/IslandScenery/IslandScenery.vue"),
      },
      {
        path: "example/crystalBear",
        name: "CrystalBear",
        component: () =>
          import("@/pages/laochen/example/CrystalBear/CrystalBear.vue"),
      },
      {
        path: "example/carShow",
        name: "CarShow",
        component: () =>
          import("@/pages/laochen/example/CarShow/CarShow.vue"),
      },
      {
        path: "example/card",
        name: "Card",
        component: () =>
          import("@/pages/laochen/example/Card/Card.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
