import type { Preview } from "@storybook/vue3";
import ElementPlus from "element-plus";
import { createPinia } from "pinia";
import "element-plus/dist/index.css";
import { setup } from "@storybook/vue3";
import docTemplate from "./docTemplate.mdx";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      page: docTemplate,
      toc: {
        contentsSelector: ".sbdocs-content",
        headingSelector: "h1, h2, h3",
        ignoreSelector: "#primary",
        title: "索引",
        disable: false,
        unsafeTocbotOptions: {
          orderedList: false,
        },
      },
    },
  },
};

setup((app) => {
  app.use(ElementPlus);
  const pinia = createPinia();
  app.use(pinia);
  window.pinia = pinia;
  app.mixin({
    /* My mixin */
  });
});

export default preview;
