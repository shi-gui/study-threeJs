<!-- 环境遮挡贴图 -->
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

const box = ref();
const init = () => {
  // 1、创建场景
  const scene = new THREE.Scene();

  // 2、创建相机
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  // 设置相机位置
  camera.position.set(0, 0, 10);
  scene.add(camera);

  // 3、导入纹理
  const doorColorTexture = new THREE.TextureLoader().load(img);
  const doorColorTexture2 = new THREE.TextureLoader().load(img2);
  const doorColorTexture3 = new THREE.TextureLoader().load(img3);
  // 几何体
  const geometry = new THREE.BoxBufferGeometry(3, 3, 3);
  //材质
  const basicMaterial = new THREE.MeshBasicMaterial({
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
  });
  const cub = new THREE.Mesh(geometry, basicMaterial);
  scene.add(cub);
  // 添加环境贴图必须给几何体设置第二组UV
  geometry.setAttribute(
    "uv2",
    new THREE.BufferAttribute(geometry.attributes.uv.array, 2)
  );

  // 添加平面
  const plane = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(3, 3),
    basicMaterial
  );
  plane.position.set(4, 0, 0);
  scene.add(plane);

  // 4、初始化渲染器
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth - 256, window.innerHeight);
  box.value.appendChild(renderer.domElement);

  // 5、创建轨道控制器
  const controls = new OrbitControls(camera, renderer.domElement);
  // 设置控制器阻尼，让控制器更有真实效果,必须在动画循环里调用.update()。
  controls.enableDamping = true;

  // 6、添加坐标轴辅助器
  const axesHelper = new THREE.AxesHelper(5);
  scene.add(axesHelper);

  // 7、渲染
  function render() {
    controls.update();
    renderer.render(scene, camera);
    //   渲染下一帧的时候就会调用render函数
    requestAnimationFrame(render);
  }
  render();

  // 8、监听resize，更新渲染画面
  // 监听画面变化，更新渲染画面
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
