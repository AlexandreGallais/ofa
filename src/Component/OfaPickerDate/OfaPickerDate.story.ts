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
    argTypes: {
        date: { control: 'date' },
        weekFirstDay: {
            options: ['Sunday', 'Monday'],
            control: { type: 'inline-radio' },
        },
        firstWeekStartingDayNumber: {
            options: [1, 4],
            control: { type: 'inline-radio' },
        },
    },
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    tags: ['isHidden'],
    args: {},
};
