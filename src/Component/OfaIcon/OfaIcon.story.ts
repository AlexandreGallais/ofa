import type { Meta, StoryObj } from '@storybook/vue3';

import Component from './OfaIcon.vue';
import { iconList } from '../../Core/iconList';
import { presetColors } from '../../storybook/presetColors';
import { Variable } from '../../Core/Variable';

const meta = {
    title: 'Component/Icon',
    component: Component,
    parameters: {
        docs: {
            canvas: { sourceState: 'shown' },
        },
    },
    argTypes: {
        name: {
            options: iconList,
            control: { type: 'select' },
        },
        color: {
            control: {
                type: 'color',
                presetColors: presetColors,
            },
        },
    },
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    tags: ['isHidden'],
    args: {
        name: 'ofa',
        color: Variable['--ofa-color-text-primary'],
        size: '64px',
    },
};

const iconItem = (name: (typeof iconList)[number]) => {
    return {
        name: name,
        color: Variable['--ofa-color-text-default'],
        size: '32px',
    };
};

export const ChevronDown: Story = {
    tags: ['isHidden'],
    args: iconItem('chevron-down'),
};
export const Circle: Story = {
    tags: ['isHidden'],
    args: iconItem('circle'),
};
export const Ofa: Story = {
    tags: ['isHidden'],
    args: iconItem('ofa'),
};
