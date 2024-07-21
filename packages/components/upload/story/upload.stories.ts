import type { Meta, StoryObj } from "@storybook/vue3";

import Upload from "../src/main.vue";

const meta: Meta<typeof Upload> = {
  component: Upload,
  tags: ["autodocs"],
  title: "COMPONENTS/Upload",
  argTypes: {},
  parameters: {
    componentSubtitle: "上传组件",
    docs: {
      description: {
        component: "上传组件描述",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Upload>;

export const Base: Story = {
  render: (args) => ({
    components: { Upload },
    setup() {
      return { args };
    },
    template: `
      <Upload ref="file" v-bind="args">
        <el-button size="small" type="primary">本地上传</el-button>
      </Upload>
      `,
  }),
  args: {
    myFile: {
      importType: ".png,.jpg",
      listType: "text",
      fileCount: 1,
    },
    showTips: false,
    showFileName: false,
  },
};

export const Files: Story = {
  render: (args) => ({
    components: { Upload },
    setup() {
      return { args };
    },
    template: `
      <Upload ref="file" v-bind="args">
        <el-button size="small" type="primary">本地上传</el-button>
      </Upload>
      `,
  }),
  args: {
    ...Base.args,
    myFile: {
      importType: ".png,.jpg",
      listType: "text",
      fileCount: 1,
      fileList: [
        {
          filePath:
            "https://img2.baidu.com/it/u=257191799,4243921961&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=854",
          fileName: "1.jpg",
        },
      ],
    },
  },
};
