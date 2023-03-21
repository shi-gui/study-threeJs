<!-- 应用图形用户界面更改变量 -->
<template>
  <div ref="box" />
</template>
<script setup>
import { ref, onMounted } from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls";
import gsap from "gsap";
import * as dat from "dat.gui";

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

  // 3、创建物体
  const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
  const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
  // 根据几何体和材质创建物体
  const cub = new THREE.Mesh(cubeGeometry, cubeMaterial);
  scene.add(cub);

  const gui = new dat.GUI();
  // 修改x轴位置
  gui
    .add(cub.position, "x")
    .min(0)
    .max(5)
    .step(0.01)
    .name("移动x轴")
    .onChange((value) => {
      console.log("值被修改：", value);
    })
    .onFinishChange((value) => {
      console.log("完全停下来:", value);
    });
  //   修改物体的颜色
  const params = {
    color: "#ffff00",
    fn: () => {
      //   让立方体运动起来
      gsap.to(cub.position, { x: 5, duration: 2, yoyo: true, repeat: -1 });
    },
  };
  gui.addColor(params, "color").onChange((value) => {
    console.log("值被修改：", value);
    cub.material.color.set(value);
  });
  // 设置选项框
  gui.add(cub, "visible").name("是否显示");

  var folder = gui.addFolder("设置立方体");
  folder.add(cub.material, "wireframe");
  // 设置按钮点击触发某个事件
  folder.add(params, "fn").name("立方体运动");

  // 4、添加坐标轴辅助器
  const axesHelper = new THREE.AxesHelper(5);
  scene.add(axesHelper);

  // 5、初始化渲染器
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth - 256, window.innerHeight);
  box.value.appendChild(renderer.domElement);

  // 6、使用轨道控制器
  const controls = new OrbitControls(camera, renderer.domElement);
  // 设置控制器阻尼，让控制器更有真实效果，必须在动画循环里调用udate方法
  controls.enableDamping = true;

  // 监听尺寸变化，更新渲染画面
  window.addEventListener("resize", () => {
    // 更新摄像头
    camera.aspect = window.innerWidth / window.innerHeight;
    // 更新摄像机的投影矩阵
    camera.updateProjectionMatrix();

    // 更新渲染器
    renderer.setSize(window.innerWidth - 256, window.innerHeight);
    // 设置渲染器的像素比
    renderer.setPixelRatio(window.devicePixelRatio);
  });

  const animate = () => {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  };
  animate();
};

onMounted(() => init());
</script>
