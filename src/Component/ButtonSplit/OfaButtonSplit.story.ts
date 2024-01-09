import type { Meta, StoryObj } from '@storybook/vue3';

import Component from './OfaButtonSplit.vue';

const meta = {
    title: 'Component/ButtonSplit',
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
        buttons: {
            control: { type: 'object' },
        },
    },
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    tags: ['isHidden'],
    args: {
        category: 'primary',
        buttons: [
            {
                innerText: 'OfaButtonSplit',
                icon: 'ofa',
                onClick: () => {
                    console.log('1');
                },
            },
            {
                innerText: 'Button 2',
                icon: 'ofa',
                onClick: () => {
                    console.log('2');
                },
            },
            {
                innerText: 'Button 3',
                onClick: () => {
                    console.log('3');
                },
            },
            {
                innerText: 'Button 4',
                disabled: true,
                onClick: () => {
                    console.log('4');
                },
            },
            {
                innerText: 'Button 5',
                icon: 'ofa',
                onClick: () => {
                    console.log('5');
                },
            },
        ],
    },
};
