<template>
  <div class="w-[256px] h-full bg-[#001529]">
    <div class="text-white flex items-center justify-center px-5">
      <img
        src="https://threejs.org/files/favicon_white.ico"
        class="w-[30px] mr-3"
        alt=""
      />
      <span class="text-[30px]">ThreeJs</span>
    </div>
    <a-menu
      v-model:openKeys="state.openKeys"
      v-model:selectedKeys="state.selectedKeys"
      mode="inline"
      theme="dark"
      :inline-collapsed="state.collapsed"
    >
      <a-sub-menu v-for="item in menu" :key="item.key">
        <template #icon>
          <component :is="item.icon" />
        </template>
        <!-- <template #title>{{ item.title }}</template> -->
        
        <!-- <a-menu-item v-for="it in item.children" :key="it.key">{{
          it.title
        }}</a-menu-item>

        {{ it }} -->

        <!-- <template v-if="it.children && "></template>
        <a-sub-menu v-for="k in it.children" :key="k.key" :title="k.title">
          <a-menu-item key="11">Option 11</a-menu-item>
          <a-menu-item key="12">Option 12</a-menu-item>
        </a-sub-menu> -->
      </a-sub-menu>
    </a-menu>
  </div>
</template>
<script lang="ts" setup>
import { reactive, watch } from "vue";
import { menu } from "./menu";

const state = reactive({
  collapsed: false,
  selectedKeys: ["1"],
  openKeys: ["sub1"],
  preOpenKeys: ["sub1"],
});
watch(
  () => state.openKeys,
  (_val, oldVal) => {
    state.preOpenKeys = oldVal;
  }
);
const toggleCollapsed = () => {
  state.collapsed = !state.collapsed;
  state.openKeys = state.collapsed ? [] : state.preOpenKeys;
};
</script>
