<!-- 几何体属性相关 -->
<template>
  <div ref="box" />
</template>
<script setup>
import { ref, onMounted } from "vue";
import * as THREE from "three";
// 导入轨道控制器
import { OrbitControls } from "three/addons/controls/OrbitControls";

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

  // 3、创建几何体
  const geometry = new THREE.BufferGeometry();
  const vertices = new Float32Array([
    -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0,
  ]);
  // itemSize = 3 因为每个顶点都是一个三元组。
  geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
  const material = new THREE.MeshBasicMaterial({
    color: 0xffff00,
    wireframe: true,
  });
  //根据几何体和材质创建物体
  const mesh = new THREE.Mesh(geometry, material);
  console.log(mesh);
  scene.add(mesh);

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
