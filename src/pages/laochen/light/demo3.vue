<!-- 详解聚光灯各种属性与应用 -->
<template>
  <div ref="box" />
</template>

<script setup>
import { ref, onMounted } from "vue";
import * as THREE from "three";
// 导入轨道控制器
import { OrbitControls } from "three/addons/controls/OrbitControls";
import * as dat from "dat.gui";

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

  // 球形
  const sphereGeometry = new THREE.SphereBufferGeometry(1, 20, 20);
  const material = new THREE.MeshStandardMaterial();
  const sphere = new THREE.Mesh(sphereGeometry, material);
  sphere.castShadow = true;
  scene.add(sphere);
  // 平面
  const planeGeometry = new THREE.PlaneBufferGeometry(30, 30);
  const plane = new THREE.Mesh(planeGeometry, material);
  plane.position.set(0, -1, 0);
  plane.rotation.x = -Math.PI / 2;
  plane.receiveShadow = true;
  scene.add(plane);

  // 灯光
  // 环境光
  const light = new THREE.AmbientLight(0xffffff, 0.5); // soft white light
  scene.add(light);
  // 聚光灯
  const spotLight = new THREE.SpotLight(0xffffff, 2);
  spotLight.position.set(5, 5, 5);
  spotLight.castShadow = true;

  // 设置阴影贴图模糊度
  spotLight.shadow.radius = 20;
  // 设置阴影贴图的分辨率
  spotLight.shadow.mapSize.set(4096, 4096);
  spotLight.target = sphere;
  // 聚光灯范围
  spotLight.angle = Math.PI / 6;
  // 距离衰减
  spotLight.distance = 0;
  // 半影衰减
  spotLight.penumbra = 0;
  // 沿着光照距离的衰减量（在renderer.physicallyCorrectLights = true; 这个模式下才生效）
  spotLight.decay = 0;

  scene.add(spotLight);

  const gui = new dat.GUI();
  gui.add(sphere.position, "x").min(-5).max(5).step(0.1);
  gui
    .add(spotLight, "angle")
    .min(0)
    .max(Math.PI / 2)
    .step(0.01);
  gui.add(spotLight, "distance").min(0).max(10).step(0.01);
  gui.add(spotLight, "penumbra").min(0).max(1).step(0.01);
  gui.add(spotLight, "decay").min(0).max(2).step(0.01);

  // 初始化渲染器
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth - 256, window.innerHeight);
  // 开启场景中的阴影贴图
  renderer.shadowMap.enabled = true;
  renderer.physicallyCorrectLights = true;
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
