import type { Meta, StoryObj } from '@storybook/vue3';

import Component from './OfaButton.vue';
import { iconList } from '../../Core/iconList';

const meta = {
    title: 'Component/Button',
    component: Component,
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
        icon: {
            options: iconList,
            control: { type: 'select' },
        },
        disabled: {
            control: { type: 'boolean' },
        },
    },
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    tags: ['isHidden'],
    args: {
        category: 'primary',
        innerText: 'OfaButton',
        icon: 'ofa',
    },
};
