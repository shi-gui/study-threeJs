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
            title: "使用threejs渲染第一个场景和物体",
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
            title: "通过Clock跟踪时间处理动画",
            key: "1-1-6",
            path: "/laochen/base/demo6",
          },
          {
            title: "Gsap控制动画属性与方法",
            key: "1-1-7",
            path: "/laochen/base/demo7",
          },
        ],
      },
    ],
  },
];
