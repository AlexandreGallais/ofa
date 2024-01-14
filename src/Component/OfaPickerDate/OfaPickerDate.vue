<script lang="ts" setup>
import { PropType, computed, ref } from 'vue';
import { Calendar } from '../../Core/Calendar';

const prop = defineProps({
    date: {
        type: Date,
        required: true,
    },

    /** Set the day that is considered the beginning of the week. */
    weekFirstDay: {
        type: String as PropType<'Sunday' | 'Monday'>,
        required: false,
        default: 'Monday',
    },

    /** Set the day the first week of a calendar year begins. */
    firstWeekStartingDayNumber: {
        type: Number as PropType<1 | 4>, // eslint-disable-line @typescript-eslint/no-magic-numbers
        required: false,
        default: 4,
    },
});

const month = ref(0);

const lol = computed(
    () => new Calendar(prop.weekFirstDay, prop.firstWeekStartingDayNumber),
);

const test = computed(() => {
    const d = new Date(prop.date);
    d.setMonth(d.getMonth() + month.value);

    return d;
});

const thisMonth = computed(() => {
    return Calendar.getMonthDividedByXWeek(
        test.value,
        6, // eslint-disable-line @typescript-eslint/no-magic-numbers
        prop.weekFirstDay === 'Monday',
        prop.firstWeekStartingDayNumber === 4, // eslint-disable-line @typescript-eslint/no-magic-numbers
    );
});
</script>

<template>
    <div ofa="picker-date">
        <button @click="month -= 1">-</button>
        <button @click="month += 1">+</button>

        {{ test }}

        <menu></menu>
        <table>
            <tr>
                <th></th>
                <th v-for="(day, i) in lol.daysFirstLetters" :key="i">
                    <span>{{ day }}</span>
                </th>
            </tr>
            <tr v-for="(days, i) in thisMonth" :key="i">
                <th>
                    <span>{{ days[0].weekNumber }}</span>
                </th>
                <td
                    v-for="(day, ii) in days"
                    :key="ii"
                    :class="{ 'other-month': day.otherMonth }"
                >
                    <span>{{ day.dayNumber }}</span>
                </td>
            </tr>
        </table>
    </div>
</template>

<style lang="scss" scoped>
[ofa='picker-date'] {
    & > table {
        background-color: var(--ofa-color-text-reverse);
        border-radius: 4px;
        user-select: none;
        border-spacing: 2px 4px;

        tr {
            border-radius: 4px;

            & > th,
            & > td {
                box-sizing: border-box;
                width: 28px;
                height: 28px;
                padding: 1px;
                border-radius: inherit;

                & > span {
                    display: block;
                    box-sizing: border-box;
                    width: 100%;
                    height: 100%;
                    border: solid 1px;
                    border-radius: inherit;
                    font-family: 'IBM Plex Sans', sans-serif;
                    font-size: 16px;
                    font-weight: 400;
                    line-height: 1.5em;
                    text-align: center;
                }
            }

            & > th {
                & > span {
                    color: var(--ofa-color-text-placeholder);
                    background-color: var(--ofa-color-background-default);
                    border-color: var(--ofa-color-background-default);
                }
            }

            & > td {
                cursor: pointer;

                & > span {
                    border-color: transparent;
                }

                &:hover {
                    background-color: var(--ofa-color-tertiary-hover);
                }

                &.other-month {
                    color: var(--ofa-color-text-placeholder);
                    pointer-events: none;
                }
            }
        }
    }
}
</style>
