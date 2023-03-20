<!-- 调用js接口控制画布全屏和退出全屏 -->
<template>
  <div ref="box" />
</template>
<script setup>
import { ref, onMounted } from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls";
import gsap from "gsap";

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

  // 添加动画
  var ctx = gsap.to(cub.position, {
    x: 5,
    duration: 5,
    ease: "power1.inOut",
    //   设置重复的次数，无限次循环-1
    repeat: -1,
    // 往返运动
    yoyo: true,
    delay: 2,
    onComplete: () => {
      console.log("动画完成");
    },
    onStart: () => {
      console.log("动画开始");
    },
  });
  gsap.to(cub.rotation, {
    x: 2 * Math.PI,
    duration: 5,
    ease: "power1.inOut",
    repeat: -1,
  });

  window.addEventListener("dblclick", () => {
    const fullScreenElement = document.fullscreenElement;
    fullScreenElement
      ? // 退出全屏，使用documen对象
        document.exitFullscreen()
      : // 让画布对象全屏
        renderer.domElement.requestFullscreen();
  });

  const animate = () => {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  };
  animate();

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
};

onMounted(() => init());
</script>
