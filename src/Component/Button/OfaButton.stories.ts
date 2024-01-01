import type { Meta, StoryObj } from '@storybook/vue3';

import Button from './OfaButton.vue';

const meta = {
    title: 'Component/Button',
    component: Button,
    parameters: {
        docs: {
            canvas: { sourceState: 'shown' },
        },
    },
    argTypes: {
        category: {
            options: ['primary', 'secondary', 'tertiary', 'ghost', 'danger'],
            control: { type: 'radio' },
        },
        innerText: {
            control: { type: 'text' },
        },
    },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    tags: ['isHidden'],
    args: {
        category: 'primary',
        innerText: 'OfaButton',
    },
};
