<!-- 金属贴图、法线贴图 -->
<template>
  <div ref="box" />
</template>

<script setup>
import { ref, onMounted } from "vue";
import * as THREE from "three";
// 导入轨道控制器
import { OrbitControls } from "three/addons/controls/OrbitControls";
import img from "./assets/color.jpg";
import img2 from "./assets/alpha.jpg";
import img3 from "./assets/ambientOcclusion.jpg";
import img4 from "./assets/height.jpg";
import img5 from "./assets/roughness.jpg";
import img6 from "./assets/metalness.jpg";
import img7 from "./assets/normal.jpg";

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

  // 导入纹理
  const doorColorTexture = new THREE.TextureLoader().load(img);
  const doorColorTexture2 = new THREE.TextureLoader().load(img2);
  const doorColorTexture3 = new THREE.TextureLoader().load(img3);
  // 导入置换贴图
  const doorColorTexture4 = new THREE.TextureLoader().load(img4);
  //导入粗糙度贴图
  const doorColorTexture5 = new THREE.TextureLoader().load(img5);
  // 导入金属贴图
  const doorColorTexture6 = new THREE.TextureLoader().load(img6);
  // 导入法线贴图
  const doorColorTexture7 = new THREE.TextureLoader().load(img7);

  // 几何体
  const geometry = new THREE.BoxBufferGeometry(3, 3, 3, 200, 200, 200);
  // 标准材质，需要设置光源
  const basicMaterial = new THREE.MeshStandardMaterial({
    color: "#ffff00",
    map: doorColorTexture,
    // alpha 贴图是一张灰度纹理，用于控制整个表面的不透明度（黑色：完全透明，白色：完全不透明）
    alphaMap: doorColorTexture2,
    transparent: true,
    // 定义要渲染哪一面（正面、背面、两者都）
    side: THREE.DoubleSide,
    // 环境贴图
    aoMap: doorColorTexture3,
    // 环境贴图强度
    aoMapIntensity: 1,
    // 置换贴图
    displacementMap: doorColorTexture4,
    // 影响程度，最大影响多少（门的厚度）
    displacementScale: 0.2,
    // 粗糙度
    roughness: 1,
    // 粗糙度贴图
    roughnessMap: doorColorTexture5,
    metalness: 1,
    // 金属贴图
    metalnessMap: doorColorTexture6,
    // 法线贴图
    normalMap: doorColorTexture7,
  });
  const cub = new THREE.Mesh(geometry, basicMaterial);
  scene.add(cub);
  // 添加环境贴图必须给几何体设置第二组UV
  geometry.setAttribute(
    "uv2",
    new THREE.BufferAttribute(geometry.attributes.uv.array, 2)
  );
  // 添加平面
  const planeGeometry = new THREE.PlaneBufferGeometry(1, 1, 200, 200);
  const plane = new THREE.Mesh(planeGeometry, basicMaterial);
  plane.position.set(3, 0, 0);
  scene.add(plane);

  // 添加光源
  const light = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(light);
  // 直线光源
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  directionalLight.position.set(10, 0, 0);
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
