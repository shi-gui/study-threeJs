<!-- 全景看房子 -->
<template>
  <div ref="box" />
</template>

<script setup>
import { ref, onMounted } from "vue";
import * as THREE from "three";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import hdrImg from "@/assets/img/VrToHouse/hdr/Living.hdr";

const box = ref();
const init = () => {
  // 初始化场景
  const scene = new THREE.Scene();

  // 初始化相机
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 0, 0.1);

  //#region 通过hdr高清图实现
  const geometry = new THREE.SphereGeometry(5, 32, 32);
  const loader = new RGBELoader();
  loader.load(hdrImg, (texture) => {
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.geometry.scale(1, 1, -1);
    scene.add(sphere);
  });
  //#endregion

  // 初始化渲染器
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth - 256, window.innerHeight);
  box.value.appendChild(renderer.domElement);
  // 创建轨道控制器
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  const render = () => {
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  };
  render();
};

onMounted(() => init());
</script>
