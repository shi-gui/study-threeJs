<!-- 汽车展示 -->
<template>
  <div ref="box" />
</template>

<script setup>
import { ref, onMounted } from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import carModel from "@/assets/img/CarShow/bmw01.glb";

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
  // 设置相机位置
  camera.position.set(0, 2, 6);
  // 更新相机宽高比
  camera.aspect = window.innerWidth / window.innerHeight;
  // 更新相机投影矩阵
  camera.updateProjectionMatrix();

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
    scene.add(bmw);
  });

  // 添加环境光
  const light = new THREE.AmbientLight(0xffffff, 1);
  scene.add(light);
};

onMounted(() => init());
</script>
