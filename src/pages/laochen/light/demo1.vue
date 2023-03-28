<!-- 灯光与阴影的关系与设置 -->
<template>
  <div ref="box" />
</template>

<script setup>
import { ref, onMounted } from "vue";
import * as THREE from "three";
// 导入轨道控制器
import { OrbitControls } from "three/addons/controls/OrbitControls";

/**
 * 灯光与阴影
 *  1、材质要满足能够对光照有反应
 *  2、设置渲染器开启阴影的计算 renderer.shadowMap.enabled = true;
 *  3、设置光照投射阴影 directionalLight.castShadow = true;
 *  4、设置物体投射阴影 sphere.castShadow = true;
 *  5、设置物体接收阴影 plane.receiveShadow = true;
 */

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
  const planeGeometry = new THREE.PlaneBufferGeometry(10, 10);
  const plane = new THREE.Mesh(planeGeometry, material);
  plane.position.set(0, -1, 0);
  plane.rotation.x = -Math.PI / 2;
  plane.receiveShadow = true;
  scene.add(plane);

  // 添加光源
  const light = new THREE.AmbientLight(0xffffff, 0.5); // soft white light
  scene.add(light);
  //直线光源
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  directionalLight.position.set(10, 10, 10);
  directionalLight.castShadow = true;
  scene.add(directionalLight);

  // 初始化渲染器
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth - 256, window.innerHeight);
  // 开启场景中的阴影贴图
  renderer.shadowMap.enabled = true;
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
