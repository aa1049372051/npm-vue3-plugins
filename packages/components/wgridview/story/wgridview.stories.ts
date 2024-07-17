import type { Meta, StoryObj } from "@storybook/vue3";

import WGridView from "../src/main.vue";

const meta: Meta<typeof WGridView> = {
  component: WGridView,
  tags: ["autodocs"],
  argTypes: {},
  title: "COMPONENTS/WGridView",
  parameters: {
    componentSubtitle: "表格组件",
    docs: {
      description: {
        component: "表格组件描述",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof WGridView>;

let data = [{ name: "张三", age: 18, sex: "男" }];
export const Base: Story = {
  args: {
    //👇 The args you need here will depend on your component
    javaApi: () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            status: 200,
            data: data,
          });
        });
      });
    },
    columns: [
      {
        label: "名称",
        prop: "name",
      },
      {
        label: "年龄",
        prop: "age",
      },
      {
        label: "性别",
        prop: "sex",
      },
    ],
    responseCb: (res) => {
      return res.data;
    },
  },
};

export const MultipleChoice: Story = {
  args: {
    ...Base.args,
    checkboxColumn: {
      type: "selection",
    },
  },
};
