<!-- 详解环境贴图 -->
<template>
  <div ref="box" />
</template>

<script setup>
import { ref, onMounted } from "vue";
import * as THREE from "three";
// 导入轨道控制器
import { OrbitControls } from "three/addons/controls/OrbitControls";

import x1 from "./assets/environmentMaps/1/px.jpg";
import x2 from "./assets/environmentMaps/1/nx.jpg";
import y1 from "./assets/environmentMaps/1/py.jpg";
import y2 from "./assets/environmentMaps/1/ny.jpg";
import z1 from "./assets/environmentMaps/1/pz.jpg";
import z2 from "./assets/environmentMaps/1/nz.jpg";
// import hdr2 from "../../../assets/img/hdr/002.hdr";

// import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
// // 加载hdr环境图
// const rgbeLoader = new RGBELoader();
// rgbeLoader.loadAsync(hdr2).then((texture) => {
//   texture.mapping = THREE.EquirectangularReflectionMapping;
//   scene.background = texture;
//   scene.environment = texture;
// });

const box = ref();
const init = () => {
  // 创建场景
  const scene = new THREE.Scene();

  // 创建相机
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  // 设置相机位置
  camera.position.set(0, 0, 10);
  scene.add(camera);

  // 设置cube纹理加载器
  const cubeTextureLoader = new THREE.CubeTextureLoader();
  const envMapTexture = cubeTextureLoader.load([x1, x2, y1, y2, z1, z2]);
  const sphereGeometry = new THREE.SphereBufferGeometry(1, 20, 20);
  const material = new THREE.MeshStandardMaterial({
    metalness: 1,
    roughness: 0.1,
    envMap: envMapTexture,
  });
  const sphere = new THREE.Mesh(sphereGeometry, material);
  scene.add(sphere);

  // 给场景添加背景
  scene.background = envMapTexture;
  // 给场景所有的物体添加默认的环境贴图
  scene.environment = envMapTexture;

  // 添加光源
  const light = new THREE.AmbientLight(0xffffff, 0.5); // soft white light
  scene.add(light);
  //直线光源
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  directionalLight.position.set(10, 10, 10);
  scene.add(directionalLight);

  // 初始化渲染器
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth - 256, window.innerHeight);
  box.value.appendChild(renderer.domElement);

  // 创建轨道控制器
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  // 添加坐标轴辅助器
  const axesHelper = new THREE.AxesHelper(5);
  scene.add(axesHelper);

  //渲染
  function render() {
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }
  render();

  // 监听resize，更新渲染画面
  window.addEventListener("resize", () => {
    // 更新摄像头
    camera.aspect = window.innerWidth / window.innerHeight;
    //   更新摄像机的投影矩阵
    camera.updateProjectionMatrix();

    //   更新渲染器
    renderer.setSize(window.innerWidth - 256, window.innerHeight);
    //   设置渲染器的像素比
    renderer.setPixelRatio(window.devicePixelRatio);
  });
};

onMounted(() => init());
</script>
