import type { Meta, StoryObj } from "@storybook/vue3";

import WArea from "../src/main.vue";

const meta: Meta<typeof WArea> = {
  component: WArea,
  tags: ["autodocs"],
  title: "COMPONENTS/WArea",
  argTypes: {},
  decorators: [
    () => ({
      template: '<div style="margin: 3em;">请选择省市区:<story/></div>',
    }),
  ],
  parameters: {
    componentSubtitle: "省市区组件",
    docs: {
      description: {
        component: "选择省市区组件",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof WArea>;

export const Base: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: "省市区组件基础用法",
      },
    },
  },
};
