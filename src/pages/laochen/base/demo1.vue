<!-- 使用threejs渲染第一个场景和物体 -->
<template>
  <div ref="box" />
</template>

<script setup>
import { ref, onMounted } from "vue";
import * as THREE from "three";

const box = ref();
const init = () => {
  // 1、创建场景
  const scene = new THREE.Scene();

  // 2、创建相机
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  // 设置相机的位置
  camera.position.set(0, 0, 10);
  scene.add(camera);

  // 3、创建物体
  const cubeGeometry = new THREE.BoxGeometry(2, 2, 2);
  const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
  // 根据几何体和材质创建物体
  const cub = new THREE.Mesh(cubeGeometry, cubeMaterial);
  scene.add(cub);

  // 4、初始化渲染器
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth - 256, window.innerHeight);
  box.value.appendChild(renderer.domElement);
  // 使用渲染器，通过相机将场景渲染进来
  renderer.render(scene, camera);
};

onMounted(() => init());
</script>
