<!-- 3D水晶熊🐻 -->
<template>
  <div ref="box" />
</template>

<script setup>
import { ref, onMounted } from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import bg from "@/assets/img/CrystalBear/050.jpg";
import gltfModel from "@/assets/img/CrystalBear/bear.gltf";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

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
  camera.position.set(1.5, 1, 1.5);
  // 更新摄像机宽高比
  camera.aspect = window.innerHeight / window.innerHeight;
  // 更新相机投影矩阵
  camera.updateProjectionMatrix();

  // 初始化渲染器
  const renderer = new THREE.WebGLRenderer();
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

  // 加载背景纹理
  const loader = new THREE.TextureLoader();
  const bgTexture = loader.load(bg);
  bgTexture.mapping = THREE.EquirectangularRefractionMapping;
  scene.background = bgTexture;
  scene.environment = bgTexture;

  // 加载小熊模型
  const gltfLoader = new GLTFLoader();
  gltfLoader.load(gltfModel, (gltf) => {
    const model = gltf.scene.children[0];
    model.material = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      envMap: bgTexture,
      refractionRatio: 0.7,
      reflectivity: 0.99,
    });

    scene.add(model);
  });

  // 添加环境光
  const light = new THREE.AmbientLight(0xffffff, 1);
  scene.add(light);
};

onMounted(() => init());
</script>
