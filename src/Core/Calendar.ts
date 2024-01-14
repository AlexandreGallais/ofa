/* eslint-disable @typescript-eslint/no-magic-numbers */
/**
 * Utility functions for a calendar
 */
export class Calendar {
    /**
     *
     * Static
     *
     */

    static setTimeToZero = (date: Date) => {
        const a = new Date(date);
        a.setHours(0, 0, 0, 0);
        return a;
    };

    static isDateTheSame = (dateA: Date, dateB: Date) => {
        return (
            Calendar.setTimeToZero(dateA).getTime() ===
            Calendar.setTimeToZero(dateB).getTime()
        );
    };

    /**
     * Get the first day of the week of a given date.
     *
     * @param date
     * The date you want to get the first day of the week.\
     * Default: `new Date()`
     *
     * @param weekStartOnMonday
     * Does the week start on a Monday?
     * Default: `true`
     */
    static getFirstDayOfTheWeek = (
        date: Date = new Date(),
        weekStartOnMonday = true,
    ) => {
        const a = Calendar.setTimeToZero(date);
        let b = a.getDay();
        if (weekStartOnMonday) b -= 1;
        if (b === -1) b = 6;

        return new Date(a.setTime(a.getTime() - b * 86400000));
    };

    /**
     * Get the week number of a given date.
     *
     * @param date
     * The date you want to know the week.\
     * Default: `new Date()`
     *
     * @param weekStartOnMonday
     * Does the week start on a Monday?\
     * Default: `true`
     *
     * @param firstWeekStartOnFourth
     * Does the first week of the year start on the fourth day?\
     * Default: `true`
     */
    static getWeekNumber = (
        date: Date = new Date(),
        weekStartOnMonday = true,
        firstWeekStartOnFourth = true,
    ) => {
        const a = this.getFirstDayOfTheWeek(new Date(date), weekStartOnMonday);
        const b = new Date(a.getFullYear(), 0, firstWeekStartOnFourth ? 4 : 1);
        const c = this.getFirstDayOfTheWeek(b, weekStartOnMonday);
        let d = (a.getTime() - c.getTime()) / 86400000 / 7 + 1;
        if (d === 53 && a.getDate() > (firstWeekStartOnFourth ? 28 : 25)) d = 1;
        if (d === 54) d = 1;

        return Math.round(d);
    };

    /**
     *
     * @param date
     * The date you want to get the month.\
     * Default: `new Date()`
     *
     * @param numberOfWeeks
     * The number of weeks you want to be returned.\
     * Default: `6`
     *
     * @param weekStartOnMonday
     * Does the week start on a Monday?\
     * Default: `true`
     *
     * @param firstWeekStartOnFourth
     * Does the first week of the year start on the fourth day?\
     * Default: `true`
     */
    static getMonthDividedByXWeek = (
        date = new Date(),
        numberOfWeeks = 6,
        weekStartOnMonday = true,
        firstWeekStartOnFourth = true,
    ) => {
        const a = Calendar.setTimeToZero(date);
        a.setDate(1);
        const b = Calendar.getFirstDayOfTheWeek(a, weekStartOnMonday);
        // const c: { date: Date; otherMonth: boolean }[][] = [];

        const c = Array.from(Array(numberOfWeeks))
            .map((_, i) =>
                Array.from(Array(7)).map(
                    (_, ii) =>
                        new Date(
                            b.setDate(
                                b.getDate() + (i === 0 && ii === 0 ? 0 : 1),
                            ),
                        ),
                ),
            )
            .map((x) => {
                const weekNumber = Calendar.getWeekNumber(
                    x[0],
                    weekStartOnMonday,
                    firstWeekStartOnFourth,
                );

                return x.map((y) => ({
                    date: y,
                    weekNumber,
                    dayNumber: y.getDate(),
                    otherMonth: a.getMonth() !== y.getMonth(),
                }));
            });

        return c;
    };

    /**
     *
     * Object
     *
     */

    #weekFirstDay: 'Sunday' | 'Monday';
    /** Represents the day that is considered the beginning of the week. */
    get weekFirstDay() {
        return this.#weekFirstDay;
    }

    #firstWeekStartingDayNumber: 1 | 4;
    /** Represents the day the first week of a calendar year begins. */
    get firstWeekStartingDayNumber() {
        return this.#firstWeekStartingDayNumber;
    }

    #days = [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
    ];
    get days() {
        return this.#days;
    }

    #daysFirstLetters: string[];
    get daysFirstLetters() {
        return this.#daysFirstLetters;
    }

    /**
     * Utility object for a calendar
     *
     * @param weekFirstDay
     * Represents the day that is considered the beginning of the week.\
     * Default: `Monday`.
     *
     * @param firstWeekStartingDayNumber
     * Represents the day of the week on which the first week of a calendar year begins.\
     * Default: `4`.
     */
    constructor(
        weekFirstDay: Calendar['weekFirstDay'] = 'Monday',
        firstWeekStartingDayNumber: Calendar['firstWeekStartingDayNumber'] = 4,
    ) {
        this.#weekFirstDay = weekFirstDay;
        this.#firstWeekStartingDayNumber = firstWeekStartingDayNumber;

        if (this.#weekFirstDay === 'Sunday') {
            this.#days.pop();
            this.#days.unshift('Sunday');
        }

        this.#daysFirstLetters = this.#days.map((day) => day.slice(0, 2));
    }
}
