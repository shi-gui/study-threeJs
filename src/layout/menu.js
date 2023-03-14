import { AppstoreOutlined } from "@ant-design/icons-vue";

export const menu = [
  {
    title: "B站老陈",
    key: "1",
    icon: AppstoreOutlined,
    children: [
      {
        title: "threejs快速入门",
        key: "1-1",
        children: [
          {
            title: "第一个3D场景",
            key: "1-1-1",
            path: "laochen/first/demo1",
          },
        ],
      },
      {
        title: "顶点概念、几何体结构",
        key: "1-2",
        children: [],
      },
    ],
  },
];
