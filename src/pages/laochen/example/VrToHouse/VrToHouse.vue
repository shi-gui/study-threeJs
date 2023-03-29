<!-- 全景看房子 -->
<template>
  <div ref="box" />
</template>

<script setup>
import { ref, onMounted } from "vue";
import * as THREE from "three";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import hdrImg from "@/assets/img/VrToHouse/hdr/Living.hdr";
import l4 from "@/assets/img/VrToHouse/living/4_l.jpg";
import r4 from "@/assets/img/VrToHouse/living/4_r.jpg";
import u4 from "@/assets/img/VrToHouse/living/4_u.jpg";
import d4 from "@/assets/img/VrToHouse/living/4_d.jpg";
import b4 from "@/assets/img/VrToHouse/living/4_b.jpg";
import f4 from "@/assets/img/VrToHouse/living/4_f.jpg";

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
  // 将相机设置设置到很近的距离，即可实现内视效果
  camera.position.set(0, 0, 0.1);
  scene.add(camera);

  //#region 通过hdr高清图实现
  const geometry = new THREE.SphereGeometry(5, 32, 32);
  const loader = new RGBELoader();
  loader.load(hdrImg, (texture) => {
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const sphere = new THREE.Mesh(geometry, material);
    // 缩放
    sphere.geometry.scale(1, 1, -1);
    scene.add(sphere);
  });
  //#endregion

  //#region 通过纹理加载器，设置六个面的贴图实现全景看房
  // const geometry = new THREE.BoxGeometry(10, 10, 10);

  // const arr = [l4, r4, u4, d4, b4, f4];
  // const boxMaterials = [];
  // arr.forEach((item, index) => {
  //   // 纹理加载
  //   let texture = new THREE.TextureLoader().load(item);
  //   if (index === 2 || index === 3) {
  //     texture.rotation = Math.PI;
  //     texture.center = new THREE.Vector2(0.5, 0.5);
  //     boxMaterials.push(new THREE.MeshBasicMaterial({ map: texture }));
  //   } else {
  //     boxMaterials.push(new THREE.MeshBasicMaterial({ map: texture }));
  //   }
  // });
  // const cube = new THREE.Mesh(geometry, boxMaterials);
  // cube.geometry.scale(1, 1, -1);
  // scene.add(cube);
  //#endregion

  // 初始化渲染器
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth - 256, window.innerHeight);
  box.value.appendChild(renderer.domElement);
  // 创建轨道控制器
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  const render = () => {
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  };
  render();
};

onMounted(() => init());
</script>
