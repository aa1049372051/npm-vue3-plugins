import type { Meta, StoryObj } from "@storybook/vue3";

import FileList from "../src/main.vue";

const meta: Meta<typeof FileList> = {
  component: FileList,
  tags: ["autodocs"],
  argTypes: {},
  title: "COMPONENTS/FileList",
  parameters: {
    componentSubtitle: "文件查看组件",
    docs: {
      description: {
        component: "简单的文件查看组件",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof FileList>;

export const Base: Story = {
  args: {
    file: [{ filePath: 'business/46551_1715658317_7164.png', fileType: 1 }],
    isViewImg: true
  },
};


