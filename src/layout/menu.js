import { BoldOutlined } from "@ant-design/icons-vue";

export const menu = [
  {
    title: "老陈",
    key: "1",
    icon: BoldOutlined,
    children: [
      {
        title: "入门与调试",
        key: "1-1",
        children: [
          {
            title: "渲染第一个场景和物体",
            key: "1-1-1",
            path: "/laochen/base/demo1",
          },
          {
            title: "轨道控制器查看物体",
            key: "1-1-2",
            path: "/laochen/base/demo2",
          },
          {
            title: "添加坐标轴辅助器",
            key: "1-1-3",
            path: "/laochen/base/demo3",
          },
          {
            title: "设置物体移动",
            key: "1-1-4",
            path: "/laochen/base/demo4",
          },
          {
            title: "物体的缩放与旋转",
            key: "1-1-5",
            path: "/laochen/base/demo5",
          },
          {
            title: "Clock跟踪时间处理动画",
            key: "1-1-6",
            path: "/laochen/base/demo6",
          },
          {
            title: "Gsap控制动画属性与方法",
            key: "1-1-7",
            path: "/laochen/base/demo7",
          },
          {
            title: "根据尺寸变化自适应画面",
            key: "1-1-8",
            path: "/laochen/base/demo8",
          },
          {
            title: "使用js实现全屏",
            key: "1-1-9",
            path: "/laochen/base/demo9",
          },
          {
            title: "应用图形用户界面",
            key: "1-1-10",
            path: "/laochen/base/demo10",
          },
        ],
      },
      {
        title: "全面认识物体",
        key: "1-2",
        children: [
          {
            title: "几何体属性相关",
            key: "1-2-1",
            path: "/laochen/advace/demo1",
          },
          {
            title: "炫酷三角形",
            key: "1-2-2",
            path: "/laochen/advace/demo2",
          },
          {
            title: "初识材质与纹理",
            key: "1-2-3",
            path: "/laochen/advace/demo3",
          },
        ],
      },
    ],
  },
];
