<template>
  <div ref="box" />
</template>

<script setup>
import { onMounted, ref } from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import cardModel from "@/assets/img/Card/scene.glb";

const box = ref();

// 初始化场景
const scene = new THREE.Scene();

// 初始化相机
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
// 设置相机位置
camera.position.set(-3.23, 2.98, 4.06);
// 更新相机宽高比
camera.aspect = window.innerWidth / window.innerHeight;
// 更新相机投影矩阵
camera.updateProjectionMatrix();

onMounted(() => {
  // 初始化渲染器
  const renderer = new THREE.WebGLRenderer({
    // 抗锯齿
    antialias: true,
  });
  renderer.setSize(window.innerWidth - 256, window.innerHeight);
  box.value.appendChild(renderer.domElement);
  // 初始化轨道控制器
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  const render = () => {
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  };
  render();

  // 添加模型
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  // 设置解压路径
  dracoLoader.setDecoderPath("/draco/gltf/");
  loader.setDRACOLoader(dracoLoader);

  loader.load(cardModel, (gltf) => {
    const model = gltf.scene;
    scene.add(model);
  });

  // 添加平行光
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(0, 50, 0);
  scene.add(light);
});
</script>
