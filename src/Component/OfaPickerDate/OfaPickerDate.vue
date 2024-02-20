<!-- eslint-disable @typescript-eslint/no-magic-numbers -->
<script lang="ts" setup>
import { computed, ref } from 'vue';
import OfaIcon from '../OfaIcon/OfaIcon.vue';
import { Calendar } from '../../Core/Calendar';
import Variable from '../../Core/Variable';

const prop = defineProps({
    /** Set the selected date */
    date: {
        type: Date,
        required: false,
    },
});

const emit = defineEmits(['update:date']);

const viewMode = ref<'year' | 'month' | 'day'>('day');
const monthsDifference = ref(0);
const weekdays = Calendar.getWeekdays(2);
const months = Calendar.getMonths(3);

const displayedDate = computed(() => {
    const d = prop.date ? new Date(prop.date) : new Date();
    d.setMonth(d.getMonth() + monthsDifference.value, 1);
    return d;
});

const dayModeTable = computed(() => Calendar.generateDayModeTable(displayedDate.value));

const weekNumbers = computed(() =>
    Array.from(Array(6).keys()).map((x) => Calendar.getDateWeekNumber(dayModeTable.value[x * 7])),
);

const viewModeTable = computed(() => {
    if (viewMode.value === 'year') return Calendar.generateYearModeTable(displayedDate.value.getFullYear());
    if (viewMode.value === 'month') return months;
    return dayModeTable.value.map((x) => x.getDate());
});

const isToday = (i: number) => {
    if (viewMode.value === 'year') return new Date().getFullYear() === viewModeTable.value[i];
    if (viewMode.value === 'month')
        return Calendar.areMonthsEqual(new Date(`${displayedDate.value.getFullYear()}-${i + 1}-1`));
    return Calendar.areDatesEqual(dayModeTable.value[i]);
};

const isSelected = (i: number) => {
    if (!prop.date) return false;

    if (viewMode.value === 'year') return prop.date.getFullYear() === viewModeTable.value[i];
    if (viewMode.value === 'month')
        return Calendar.areMonthsEqual(prop.date, new Date(`${displayedDate.value.getFullYear()}-${i + 1}-1`));
    return Calendar.areDatesEqual(prop.date, dayModeTable.value[i]);
};

const isDisabled = (i: number) => {
    if (viewMode.value === 'year' || viewMode.value === 'month') return false;
    return !Calendar.areMonthsEqual(displayedDate.value, dayModeTable.value[i]);
};

const editMonthsDifference = (num: number) => {
    if (viewMode.value === 'year') num *= 144;
    if (viewMode.value === 'month') num *= 12;
    monthsDifference.value += num;
};

const select = (i: number) => {
    if (viewMode.value === 'year') {
        monthsDifference.value += ((viewModeTable.value[i] as number) - displayedDate.value.getFullYear()) * 12;
        viewMode.value = 'month';
        return;
    }

    if (viewMode.value === 'month') {
        monthsDifference.value +=
            new Date(new Date(displayedDate.value).setMonth(i)).getMonth() - displayedDate.value.getMonth();
        viewMode.value = 'day';
        return;
    }

    emit('update:date', dayModeTable.value[i]);
    monthsDifference.value = 0;
};
</script>

<template>
    <div ofa="picker-date">
        <menu>
            <div class="switch">
                <button @click="editMonthsDifference(-1)">
                    <OfaIcon :name="'chevron-left'" />
                </button>

                <button @click="editMonthsDifference(1)">
                    <OfaIcon :name="'chevron-right'" />
                </button>
            </div>

            <div class="date">
                <button v-if="viewMode === 'day'" @click="viewMode = 'month'">
                    {{ displayedDate.toLocaleString(Variable['--ofa-locale'], { month: 'long' }) }}
                </button>

                <button v-if="viewMode === 'day' || viewMode === 'month'" @click="viewMode = 'year'">
                    {{ displayedDate.toLocaleString(Variable['--ofa-locale'], { year: 'numeric' }) }}
                </button>

                <span v-if="viewMode === 'year'">{{ viewModeTable[0] }} - {{ viewModeTable[11] }}</span>
            </div>
        </menu>

        <div class="calendar" :class="viewMode">
            <ul v-if="viewMode === 'day'" class="weekdays">
                <li v-for="(weekDay, i) in weekdays" :key="i">
                    {{ weekDay }}
                </li>
            </ul>

            <div class="table-wrapper">
                <ul v-if="viewMode === 'day'" class="week-numbers">
                    <li v-for="(weekNumber, i) in weekNumbers" :key="i">
                        {{ weekNumber }}
                    </li>
                </ul>

                <table>
                    <td
                        v-for="(value, i) in viewModeTable"
                        :key="i"
                        :class="{ today: isToday(i), selected: isSelected(i), disabled: isDisabled(i) }"
                        @click="select(i)"
                    >
                        <span>
                            {{ value }}
                        </span>
                    </td>
                </table>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
[ofa='picker-date'] {
    display: flex;
    flex-direction: column;
    width: fit-content;
    padding: 3px;
    gap: 3px;
    color: var(--ofa-color-text-default);
    background-color: var(--ofa-color-background-default);
    border: solid 1px var(--ofa-color-border-default);
    border-radius: var(--ofa-border-radius);
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 16px;
    font-weight: 400;
    line-height: 1.5em;
    user-select: none;

    & > menu {
        display: flex;
        justify-content: space-between;

        & > div {
            display: flex;
            align-items: center;
            gap: 4px;
        }

        & > .switch > button {
            --ofa-icon-size: 16px;
            --ofa-icon-color: var(--ofa-color-text-default);

            all: unset;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 28px;
            height: 28px;
            margin: 2px;
            border-radius: var(--ofa-border-radius);
            cursor: pointer;

            &:hover {
                background-color: var(--ofa-color-tertiary-hover);
            }

            &:active {
                background-color: var(--ofa-color-tertiary-active);
            }
        }

        & > .date {
            padding: 0 4px;

            /* stylelint-disable-next-line no-descending-specificity */
            & > button {
                all: unset;
                text-transform: capitalize;
                cursor: pointer;

                &:hover {
                    text-decoration: underline;
                }
            }
        }
    }

    & > .calendar {
        --div-w: 4;
        --div-h: 3;

        display: flex;
        flex-direction: column;
        width: 256px;
        height: 224px;
        background-color: var(--ofa-color-text-reverse);
        border-radius: inherit;

        ul > li {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 24px;
            height: 24px;
            margin: 4px;
            color: var(--ofa-color-text-placeholder);
            background-color: var(--ofa-color-background-default);
            border-radius: var(--ofa-border-radius);
            text-transform: capitalize;
        }

        ul.weekdays {
            display: flex;
            padding-left: 32px;
        }

        ul.week-numbers {
            display: flex;
            flex-direction: column;
        }

        & > .table-wrapper {
            display: flex;

            & > table {
                display: flex;
                flex-wrap: wrap;
                width: 256px;
                height: 224px;

                & > td {
                    display: flex;
                    box-sizing: border-box;
                    justify-content: center;
                    align-items: center;
                    width: calc(100% / var(--div-w) - 4px);
                    height: calc(100% / var(--div-h) - 4px);
                    margin: 2px;
                    padding: 2px;
                    border-radius: var(--ofa-border-radius);
                    text-transform: capitalize;

                    & > span {
                        display: flex;
                        box-sizing: border-box;
                        justify-content: center;
                        align-items: center;
                        width: 100%;
                        height: 100%;
                        border: solid 1px transparent;
                        border-radius: inherit;
                    }

                    &:hover {
                        background-color: var(--ofa-color-tertiary-hover);
                    }

                    &.today > span {
                        border-color: var(--ofa-color-primary-default);
                    }

                    &.disabled {
                        color: var(--ofa-color-text-placeholder);
                        pointer-events: none;
                    }

                    &.selected {
                        background-color: var(--ofa-color-primary-default);

                        & > span {
                            color: var(--ofa-color-text-reverse);
                        }

                        &.today > span {
                            border-color: var(--ofa-color-text-reverse);
                        }
                    }
                }
            }
        }

        &.day {
            --div-w: 7;
            --div-h: 6;

            table {
                width: 224px;
                height: 192px;
            }
        }
    }
}
</style>
