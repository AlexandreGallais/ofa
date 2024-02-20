import type { Meta, StoryObj } from '@storybook/vue3';

import Component from './OfaPickerDate.vue';

const meta = {
    title: 'Component/Picker/Date',
    component: Component,
    parameters: {
        docs: {
            canvas: { sourceState: 'shown' },
        },
    },
    argTypes: {},
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    tags: ['isHidden'],
    args: {
        date: new Date('2024-01-05'),
    },
};
