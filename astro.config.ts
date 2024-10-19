// @ts-check
import { defineConfig } from "astro/config";

import vue from "@astrojs/vue";

const DEFAULT_LAYOUT = "../../layouts/MdPostLayout.astro";

function setDefaultLayout() {
  return function (_: any, file: any) {
    const { frontmatter } = file.data.astro;
    if (!frontmatter.layout) frontmatter.layout = DEFAULT_LAYOUT;
  };
}

// https://astro.build/config
export default defineConfig({
  site: "https://arwn.github.io",
  integrations: [vue()],
  markdown: {
    remarkPlugins: [setDefaultLayout],
    syntaxHighlight: false,
  },
});
