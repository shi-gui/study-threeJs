<template>
  <div ref="box" />
</template>
<script setup>
import { ref, onMounted } from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import skyImg from "@/assets/img/IslandScenery/sky.jpg";
import skyVideo from "@/assets/img/IslandScenery/sky.mp4";
// 导入水面
import { Water } from "three/examples/jsm/objects/Water2";
import water1 from "@/assets/img/IslandScenery/Water_1_M_Normal.jpg";
import water2 from "@/assets/img/IslandScenery/Water_2_M_Normal.jpg";
// 导入gltf载入库
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import isLand from "@/assets/img/IslandScenery/island2.glb";

const box = ref();
const init = () => {
  // 初始化场景
  const scene = new THREE.Scene();

  //#region 初始化相机
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    2000
  );
  // 设置相机位置
  camera.position.set(-50, 50, 130);
  // 更新摄像头宽高比例
  camera.aspect = window.innerWidth / window.innerHeight;
  // 更新摄像头投影矩阵
  camera.updateProjectionMatrix();
  scene.add(camera);
  //#endregion

  //#region 初始化渲染器
  const renderer = new THREE.WebGLRenderer({
    // 设置抗锯齿
    antialias: true,
    // 对数深度缓冲区
    ogarithmicDepthBuffer: true,
  });
  // 输出环境编码
  renderer.outputEncoding = THREE.sRGBEncoding;
  // 设置渲染器宽高
  renderer.setSize(window.innerWidth - 256, window.innerHeight);
  // 监听屏幕大小改变，修改渲染器的宽高，相机的比例
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth - 256, window.innerHeight);
  });
  box.value.appendChild(renderer.domElement);
  const render = () => {
    // 渲染场景
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  };
  render();
  //#endregion

  // 创建轨道控制器
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  // 创建一个巨大的天空球体
  const skyGeometry = new THREE.SphereGeometry(1000, 60, 60);
  const skyMaterial = new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load(skyImg),
  });
  skyGeometry.scale(1, 1, -1);
  const sky = new THREE.Mesh(skyGeometry, skyMaterial);
  scene.add(sky);

  // 视频纹理
  const video = document.createElement("video");
  video.src = skyVideo;
  video.loop = true;
  // 因为浏览器安全策略，设置loop不能自动播放，需要手动触发play方法
  window.addEventListener("click", () => {
    if (video.paused) {
      video.play();
      let texture = new THREE.VideoTexture(video);
      skyMaterial.map = texture;
      skyMaterial.map.needsUpdate = true;
    }
  });

  // 创建水面
  const waterGeometry = new THREE.CircleBufferGeometry(300, 64);
  const water = new Water(waterGeometry, {
    textureWidth: 1024,
    textureHeight: 1024,
    color: 0xeeeeff,
    flowDirection: new THREE.Vector2(1, 1),
    scale: 1,
    // ThreeJS 创建水面报错 /textures/water/Water_1_M_Normal.jpg 404 解决方法
    // https://betheme.net/xiaochengxu/35024.html?action=onClick
    normalMap0: new THREE.TextureLoader().load(water1), //添加水波图片
    normalMap1: new THREE.TextureLoader().load(water2),
  });
  water.position.y = 3;
  // 水面旋转至水平
  water.rotation.x = -Math.PI / 2;
  scene.add(water);

  //#region 添加小岛模型
  const loader = new GLTFLoader();
  // 实例化draco载入库
  const dracoLoader = new DRACOLoader();
  // 添加draco载入库
  // TODO，暂未解决
  dracoLoader.setDecoderPath("./public/draco/");
  // 添加draco载入库
  loader.setDRACOLoader(dracoLoader);

  loader.load(isLand, (gltf) => {
    scene.add(gltf.scene);
  });
  //#endregion
};

onMounted(() => init());
</script>
