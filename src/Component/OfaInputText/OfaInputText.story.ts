import type { Meta, StoryObj } from '@storybook/vue3';

import Component from './OfaInputText.vue';

const meta = {
    title: 'Component/Input/Text',
    component: Component,
    parameters: {
        docs: {
            canvas: { sourceState: 'shown' },
        },
    },
    argTypes: {
        updateOn: {
            options: ['input', 'change'],
            control: { type: 'radio' },
        },
    },
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    tags: ['isHidden'],
    args: { value: 'Input Text' },
};
