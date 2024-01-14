<script lang="ts" setup>
import { PropType, computed, onUpdated, ref } from 'vue';
import OfaIcon from '../OfaIcon/OfaIcon.vue';
import { Calendar } from '../../Core/Calendar';

const prop = defineProps({
    /** Set the selected date */
    date: {
        type: Date,
        required: false,
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

const emit = defineEmits(['update:date']);

const lol = computed(
    () => new Calendar(prop.weekFirstDay, prop.firstWeekStartingDayNumber),
);

const mode = ref<'year' | 'month' | 'day'>('day');

const displayedDate = ref(new Date(prop.date ?? new Date()));

const info = computed(() => {
    if (mode.value === 'year') {
        return '1900 - 2100'; // TODO min to max date year
    }

    if (mode.value === 'month') {
        return displayedDate.value?.toLocaleString('default', {
            year: 'numeric',
        });
    }

    return displayedDate.value?.toLocaleString('default', {
        year: 'numeric',
        month: 'long',
    });
});

const displayedCalendar = computed(() => {
    return Calendar.getMonthDividedByXWeek(
        displayedDate.value,
        6, // eslint-disable-line @typescript-eslint/no-magic-numbers
        prop.weekFirstDay === 'Monday',
        prop.firstWeekStartingDayNumber === 4, // eslint-disable-line @typescript-eslint/no-magic-numbers
    );
});

const switchCal = (num: number) => {
    displayedDate.value = new Date(
        displayedDate.value.setMonth(displayedDate.value.getMonth() + num),
    );
};

onUpdated(() => {
    console.log('hello');
});
</script>

<template>
    <div ofa="picker-date">
        <menu>
            <button
                class="year"
                :class="{ active: mode === 'year' }"
                @click="mode = 'year'"
            >
                {{ prop.date?.toLocaleString('default', { year: 'numeric' }) }}
            </button>

            <button
                class="month"
                :class="{ active: mode === 'month' }"
                @click="mode = 'month'"
            >
                {{ prop.date?.toLocaleString('default', { month: 'long' }) }}
            </button>

            <button
                class="day"
                :class="{ active: mode === 'day' }"
                @click="mode = 'day'"
            >
                {{ prop.date?.toLocaleString('default', { day: 'numeric' }) }}
            </button>

            <button @click="switchCal(-1)">
                <OfaIcon
                    :name="'chevron-left'"
                    :size="'16px'"
                    :color="'black'"
                />
            </button>

            <button @click="switchCal(1)">
                <OfaIcon
                    :name="'chevron-right'"
                    :size="'16px'"
                    :color="'black'"
                />
            </button>
        </menu>
        <div class="info">
            {{ info }}
        </div>
        <table>
            <tr>
                <th></th>
                <th v-for="(day, i) in lol.daysFirstLetters" :key="i">
                    <span>{{ day }}</span>
                </th>
            </tr>
            <tr v-for="(days, i) in displayedCalendar" :key="i">
                <th>
                    <span>{{ days[0].weekNumber }}</span>
                </th>
                <td
                    v-for="(day, ii) in days"
                    :key="ii"
                    :class="{
                        'other-month': day.otherMonth,
                        active: date && Calendar.isDateTheSame(date, day.date),
                    }"
                    @click="emit('update:date', day.date)"
                >
                    <span>{{ day.dayNumber }}</span>
                </td>
            </tr>
        </table>
    </div>
</template>

<style lang="scss" scoped>
[ofa='picker-date'] {
    display: flex;
    flex-direction: column;
    width: fit-content;
    padding: 3px;
    gap: 3px;
    background-color: var(--ofa-color-background-default);
    border: solid 1px var(--ofa-color-border-default);
    border-radius: 4px;
    user-select: none;

    & > menu {
        display: flex;
        margin: 0;
        padding: 0;
        padding: 2px;
        gap: 2px;
        background-color: var(--ofa-color-text-reverse);
        border-radius: inherit;

        & > button {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 28px;
            height: 28px;
            padding: 0;
            background-color: transparent;
            border: none;
            border-radius: inherit;
            font-family: 'IBM Plex Sans', sans-serif;
            font-size: 16px;
            font-weight: 400;
            line-height: 1.5em;
            text-transform: capitalize;
            cursor: pointer;

            &:hover {
                background-color: var(--ofa-color-tertiary-hover);
            }

            &:not(.year, .month, .day):active {
                background-color: var(--ofa-color-tertiary-active);
            }

            &.active {
                color: var(--ofa-color-text-reverse);
                background-color: var(--ofa-color-primary-default);
                pointer-events: none;
            }

            &.year {
                width: 59px;
            }

            &.month {
                width: 88px;
            }
        }
    }

    .info {
        display: flex;
        box-sizing: border-box;
        justify-content: flex-end;
        height: 32px;
        padding: 4px;
        font-family: 'IBM Plex Sans', sans-serif;
        font-size: 16px;
        font-weight: 400;
        line-height: 1.5em;
    }

    & > table {
        display: flex;
        flex-direction: column;
        padding: 2px;
        gap: 2px;
        background-color: var(--ofa-color-text-reverse);
        border-radius: inherit;
        border-spacing: 0;

        & > tr {
            display: flex;
            padding: 1px;
            gap: 2px;
            border-radius: inherit;

            & > th,
            & > td {
                box-sizing: border-box;
                width: 28px;
                height: 28px;
                padding: 1px;
                border-radius: inherit;

                & > span {
                    display: flex;
                    box-sizing: border-box;
                    justify-content: center;
                    align-items: center;
                    width: 100%;
                    height: 100%;
                    border: solid 1px transparent;
                    border-radius: inherit;
                    font-family: 'IBM Plex Sans', sans-serif;
                    font-size: 16px;
                    font-weight: 400;
                    line-height: 1.5em;
                }
            }

            & > th {
                & > span {
                    color: var(--ofa-color-text-placeholder);
                    background-color: var(--ofa-color-background-default);
                }
            }

            & > td {
                cursor: pointer;

                &:hover {
                    background-color: var(--ofa-color-tertiary-hover);
                }

                &.active {
                    color: var(--ofa-color-text-reverse);
                    background-color: var(--ofa-color-primary-default);
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
