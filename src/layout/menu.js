import { BoldOutlined } from "@ant-design/icons-vue";

export const menu = [
  {
    title: "老陈",
    key: "1",
    icon: BoldOutlined,
    children: [
      {
        title: "基础知识",
        key: "1-1",
        children: [
          {
            title: "使用threejs渲染第一个场景和物体",
            key: "1-1-1",
            path: "/laochen/base/demo1",
          },
        ],
      },
    ],
  },
];
