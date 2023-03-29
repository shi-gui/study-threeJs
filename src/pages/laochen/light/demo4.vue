<!-- 详解点光源属性与应用 -->
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
  const light = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(light);

  // 点光源
  const pointLight = new THREE.PointLight(0xff0000, 1);
  pointLight.position.set(2, 3, 2);
  // 此属性设置为 true 将投射阴影
  pointLight.castShadow = true;

  // 设置阴影贴图模糊度
  pointLight.shadow.radius = 20;
  // 设置阴影贴图的分辨率
  pointLight.shadow.mapSize.set(4096, 4096);
  // 沿着光照距离的衰退量，默认值为2
  pointLight.decay = 0;

  const smallBall = new THREE.Mesh(
    new THREE.SphereBufferGeometry(0.1, 20, 20),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
  );
  smallBall.position.set(2, 2, 2);
  // 给小球添加点光源
  smallBall.add(pointLight);

  scene.add(smallBall);

  const gui = new dat.GUI();
  gui.add(pointLight.position, "x").min(-5).max(5).step(0.1);
  gui.add(pointLight, "distance").min(0).max(10).step(0.01);
  gui.add(pointLight, "decay").min(0).max(2).step(0.01);

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

  const clock = new THREE.Clock();

  //渲染
  function render() {
    let time = clock.getElapsedTime();
    smallBall.position.x = Math.sin(time) * 3;
    smallBall.position.z = Math.cos(time) * 3;
    smallBall.position.y = 2 + Math.sin(time * 10);

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
