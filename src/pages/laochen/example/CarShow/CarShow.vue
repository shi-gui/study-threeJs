<!-- 汽车展示 -->
<template>
  <div ref="box" />
  <div class="fixed top-5 right-5">
    <div class="">
      <h1 class="text-lg font-bold">汽车展示与选配</h1>
    </div>
    <h2 class="font-bold">选择车身颜色</h2>
    <div class="flex">
      <div
        v-for="(item, index) in colors"
        :key="index"
        @click="selectColor(index)"
      >
        <div
          class="w-5 h-5 m-1 rounded cursor-pointer"
          :style="{ backgroundColor: item }"
        />
      </div>
    </div>

    <h2 class="font-bold mt-5">选择贴膜材质</h2>
    <div class="flex">
      <div
        v-for="(item, index) in materials"
        :key="index"
        @click="selectMaterial(index)"
      >
        <div class="m-1">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import carModel from "@/assets/img/CarShow/bmw01.glb";

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
camera.position.set(0, 2, 6);
// 更新相机宽高比
camera.aspect = window.innerWidth / window.innerHeight;
// 更新相机投影矩阵
camera.updateProjectionMatrix();

let wheels = [];
let carBody, frontCar, hoodCar, glassCar;
// 创建材质
const bodyMaterial = new THREE.MeshPhysicalMaterial({
  color: 0xff0000,
  metalness: 1, // 金属度
  roughness: 0.5, // 粗糙程度
  clearcoat: 1, // 清晰（喷漆那种光滑度）
  clearcoatRoughness: 0,
});
const frontMaterial = new THREE.MeshPhysicalMaterial({
  color: 0xff0000,
  metalness: 1,
  roughness: 0.5,
  clearcoat: 1,
  clearcoatRoughness: 0,
});
const hoodMaterial = new THREE.MeshPhysicalMaterial({
  color: 0xff0000,
  metalness: 1,
  roughness: 0.5,
  clearcoat: 1,
  clearcoatRoughness: 0,
});
const wheelsMaterial = new THREE.MeshPhysicalMaterial({
  color: 0xff0000,
  metalness: 1,
  roughness: 0.1,
});
const glassMaterial = new THREE.MeshPhysicalMaterial({
  color: 0xffffff,
  metalness: 0,
  roughness: 0,
  transmission: 1,
  transparent: true,
});

let colors = ["red", "blue", "green", "gray", "orange", "purple"];
let selectColor = (index) => {
  bodyMaterial.color.set(colors[index]);
  frontMaterial.color.set(colors[index]);
  hoodMaterial.color.set(colors[index]);
  wheelsMaterial.color.set(colors[index]);
  // glassMaterial.color.set(colors[index]);
};

let materials = [
  { name: "磨砂", value: 1 },
  { name: "冰晶", value: 0 },
];
let selectMaterial = (index) => {
  bodyMaterial.clearcoatRoughness = materials[index].value;
  frontMaterial.clearcoatRoughness = materials[index].value;
  hoodMaterial.clearcoatRoughness = materials[index].value;
};

onMounted(() => {
  // 初始化渲染器
  const renderer = new THREE.WebGLRenderer({
    // 抗锯齿
    antialias: true,
  });
  renderer.setSize(window.innerWidth - 256, window.innerHeight);
  box.value.appendChild(renderer.domElement);
  // 设置渲染背景
  renderer.setClearColor("#000");
  scene.background = new THREE.Color("#ccc");
  scene.environment = new THREE.Color("#ccc");
  // 初始化轨道控制器
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  const render = () => {
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  };
  render();

  // 添加网格地面
  const gridHelper = new THREE.GridHelper(15, 15);
  gridHelper.material.opacity = 0.2;
  gridHelper.material.transparent = true;
  scene.add(gridHelper);

  // 添加汽车模型
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  // 设置解压路径
  dracoLoader.setDecoderPath("/draco/gltf/");
  loader.setDRACOLoader(dracoLoader);
  loader.load(carModel, (gltf) => {
    const bmw = gltf.scene;
    bmw.traverse((child) => {
      if (child.isMesh) {
        // console.log(child.name);
      }
      // 判断是否是轮毂
      if (child.isMesh && child.name.includes("轮毂")) {
        child.material = wheelsMaterial;
        wheels.push(child);
      }
      // 判断是否是车身
      if (child.isMesh && child.name.includes("Mesh002")) {
        carBody = child;
        carBody.material = bodyMaterial;
      }
      // 判断是否是前脸
      if (child.isMesh && child.name.includes("前脸")) {
        child.material = frontMaterial;
        frontCar = child;
      }
      // 判断是否是引擎盖
      if (child.isMesh && child.name.includes("引擎盖_1")) {
        child.material = hoodMaterial;
        hoodCar = child;
      }
      // 判断是否是挡风玻璃
      if (child.isMesh && child.name.includes("挡风玻璃")) {
        child.material = glassMaterial;
        glassCar = child;
      }
    });
    scene.add(bmw);
  });

  // 添加灯光
  const light1 = new THREE.DirectionalLight(0xffffff, 1);
  light1.position.set(0, 0, 10);
  scene.add(light1);
  const light2 = new THREE.DirectionalLight(0xffffff, 1);
  light2.position.set(0, 0, -10);
  scene.add(light2);
  const light3 = new THREE.DirectionalLight(0xffffff, 1);
  light3.position.set(10, 0, 0);
  scene.add(light3);
  const light4 = new THREE.DirectionalLight(0xffffff, 1);
  light4.position.set(-10, 0, 0);
  scene.add(light4);
  const light5 = new THREE.DirectionalLight(0xffffff, 1);
  light5.position.set(0, 10, 0);
  scene.add(light5);
  const light6 = new THREE.DirectionalLight(0xffffff, 0.3);
  light6.position.set(5, 10, 0);
  scene.add(light6);
  const light7 = new THREE.DirectionalLight(0xffffff, 0.3);
  light7.position.set(0, 10, 5);
  scene.add(light7);
  const light8 = new THREE.DirectionalLight(0xffffff, 0.3);
  light8.position.set(0, 10, -5);
  scene.add(light8);
  const light9 = new THREE.DirectionalLight(0xffffff, 0.3);
  light9.position.set(-5, 10, 0);
  scene.add(light9);
});
</script>
