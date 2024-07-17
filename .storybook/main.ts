import type { StorybookConfig } from "@storybook/vue3-vite";

const config: StorybookConfig = {
  stories: [
    "../packages/Intro.mdx",
    "../packages/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../packages/**/*.mdx",
  ],
  refs: {
    // "design-system": {
    //   title: "Storybook Design System",
    //   url: "https://master--5ccbc373887ca40020446347.chromatic.com/",
    //   expanded: false,
    // },
  },
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
    "@storybook/addon-storysource",
    "@storybook/addon-actions",
  ],
  framework: {
    name: "@storybook/vue3-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
};
export default config;
