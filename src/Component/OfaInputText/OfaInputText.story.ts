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
        readonly: {
            control: { type: 'boolean' },
        },
    },
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    tags: ['isHidden'],
};
