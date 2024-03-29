import type { StorybookConfig } from "@storybook/vue3-vite";

const config: StorybookConfig = {
    stories: [
        "../src/**/*.mdx",
        "../src/**/*.story.ts"
    ],
    staticDirs: [
        "../src/static",
    ],
    addons: [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/addon-interactions",
        "@storybook/addon-mdx-gfm",
        "storybook-addon-i18n/register"
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
