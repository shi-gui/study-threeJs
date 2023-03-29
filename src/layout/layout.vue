<template>
  <div class="w-[256px] h-full bg-[#001529] overflow-y-auto">
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
      @click="handleClick"
    >
      <template v-for="item in menu" :key="item.key">
        <template v-if="!item.children">
          <a-menu-item :key="item.key">
            <template #icon>
              <PieChartOutlined />
            </template>
            {{ item.title }}
          </a-menu-item>
        </template>
        <template v-else>
          <menu-item :key="item.key" :menu-info="item" />
        </template>
      </template>
    </a-menu>
  </div>
</template>
<script lang="ts" setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { PieChartOutlined } from "@ant-design/icons-vue";
import { menu } from "./menu";
import MenuItem from "./components/MenuItem.vue";

const router = useRouter();
const state = reactive({
  collapsed: false,
  selectedKeys: [],
  openKeys: [],
  preOpenKeys: [],
});

const handleClick = ({ key }) => {
  let path = undefined;
  function getCurrentMenu(m) {
    for (let i = 0; i < m.length; i++) {
      if (m[i].key === key) {
        path = m[i]?.path;
      } else if (m[i].children) {
        getCurrentMenu(m[i].children);
      }
    }
  }
  getCurrentMenu(menu);

  path && router.replace(path);
};
</script>
