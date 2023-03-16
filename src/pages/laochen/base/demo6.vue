<!-- 通过Clock跟踪时间处理动画 -->
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

  // 4、添加坐标轴辅助器
  const axesHelper = new THREE.AxesHelper(5);
  scene.add(axesHelper);

  // 5、初始化渲染器
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth - 256, window.innerHeight);
  box.value.appendChild(renderer.domElement);

  // 6、使用轨道控制器
  const controls = new OrbitControls(camera, renderer.domElement);

  // 设置时钟
  const clock = new THREE.Clock();
  const animate = () => {
    // 获取时钟运行总时长
    const time = clock.getElapsedTime();
    cub.position.x = time % 5;

    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  };
  animate();
};

onMounted(() => init());
</script>
