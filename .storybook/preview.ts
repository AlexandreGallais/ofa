import type { Preview } from "@storybook/vue3";

import './style.scss';

const preview: Preview = {
    parameters: {
        options: {
            storySort: {
                order: ['Icon/Docs', '*']
            }
        },
        actions: { argTypesRegex: "^on[A-Z].*" },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
};

export default preview;
