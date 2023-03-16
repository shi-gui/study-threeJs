<!-- 物体的缩放与旋转 -->
<template>
  <div ref="box" />
</template>
<script setup>
import { ref, onMounted } from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls";

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
  // 设置相机位置
  camera.position.set(0, 0, 10);
  scene.add(camera);

  // 3、创建物体
  const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
  const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
  // 根据几何体和材质创建物体
  const cub = new THREE.Mesh(cubeGeometry, cubeMaterial);
  scene.add(cub);
  // 缩放
  cub.scale.set(5, 1, 1);

  // 4、添加坐标轴辅助器
  const axesHelper = new THREE.AxesHelper(5);
  scene.add(axesHelper);

  // 5、初始化渲染器
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth - 256, window.innerHeight);
  box.value.appendChild(renderer.domElement);

  // 6、使用轨道控制器
  const controls = new OrbitControls(camera, renderer.domElement);

  const animate = () => {
    // 设置x轴的物体移动
    cub.position.y += 0.05;
    if (cub.position.y >= 5) cub.position.y = 0;

    // 旋转
    cub.rotation.y += 0.1;

    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  };
  animate();
};

onMounted(() => init());
</script>
