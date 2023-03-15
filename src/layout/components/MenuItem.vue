<script lang="ts">
export default {
  name: "MenuItem",
};
</script>
<script lang="ts" setup>
const props = defineProps({
  menuInfo: {
    type: Object,
    default: () => ({}),
  },
});
</script>

<template>
  <a-sub-menu :key="menuInfo.key">
    <template #icon>
      <component :is="menuInfo.icon"></component>
    </template>
    <template #title>
      {{ menuInfo.title }}
    </template>
    <template v-for="item in menuInfo.children" :key="item.key">
      <template v-if="!item.children">
        <a-menu-item :key="item.key">
          <component :is="item.icon"></component>
          {{ item.title }}
        </a-menu-item>
      </template>
      <template v-else>
        <menu-item :menu-info="item" :key="item.key" />
      </template>
    </template>
  </a-sub-menu>
</template>
