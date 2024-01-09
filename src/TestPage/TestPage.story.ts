import type { Meta, StoryObj } from '@storybook/vue3';

import Button from './TestPage.vue';

const meta = {
    title: 'Test page',
    component: Button,
    parameters: {
        docs: {
            canvas: { sourceState: 'shown' },
        },
    },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    tags: ['isHidden'],
};
