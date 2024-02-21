import Variable from './Variable';

export type Weekdays = 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';

export class Calendar {
    /**
     * Returns the given date with the time set to midnight (00:00:00.000).
     * @param date - The input date.
     */
    static getDateResetToMidnight = (date: Date = new Date()) => {
        const a = new Date(date);
        a.setHours(0, 0, 0, 0);
        return a;
    };

    /**
     * Checks if two dates are equal, considering only the date portion and ignoring time.
     * @param dateA - The first date for comparison.
     * @param dateB - The second date for comparison.
     */
    static areDatesEqual = (dateA: Date, dateB: Date = new Date()) => {
        return Calendar.getDateResetToMidnight(dateA).getTime() === Calendar.getDateResetToMidnight(dateB).getTime();
    };

    /**
     * Checks if the months of two dates are equal.
     * @param dateA - The first date for comparison.
     * @param dateB - The second date for comparison.
     */
    static areMonthsEqual = (dateA: Date, dateB: Date = new Date()) => {
        return (
            Calendar.getDateResetToMidnight(dateA).getMonth() === Calendar.getDateResetToMidnight(dateB).getMonth() &&
            Calendar.getDateResetToMidnight(dateA).getFullYear() ===
                Calendar.getDateResetToMidnight(dateB).getFullYear()
        );
    };

    /**
     * Gets the list of months in order.
     * @param length - The maximum length of the returned strings (e.g., `3`, `1`).
     * @param locale - Locale codes.
     */
    static getMonths = (length?: number, locale: string = Variable['--ofa-locale']) => {
        return Array.from(Array(12).keys()).map((x) =>
            new Date(`2000-${x + 1}-01`)
                .toLocaleString(locale, {
                    month: 'long',
                })
                .toLowerCase()
                .slice(0, length),
        );
    };

    /**
     * Gets the list of days of the week in order, based on a chosen first day of the week.
     * @param length - The maximum length of the returned strings (e.g., `3`, `1`).
     * @param weekFirstDay - The day considered the start of the week.
     * @param locale - Locale codes.
     */
    static getWeekdays = (
        length?: number,
        weekFirstDay: Weekdays = Variable['--ofa-week-first-day'],
        locale: string = Variable['--ofa-locale'],
    ): string[] => {
        const a: { [key in Weekdays]: string } = {
            Sunday: '2006',
            Monday: '2001',
            Tuesday: '2002',
            Wednesday: '2003',
            Thursday: '2004',
            Friday: '1999',
            Saturday: '2000',
        };

        return Array.from(Array(7).keys()).map((x) =>
            new Date(`${a[weekFirstDay]}-01-0${x + 1}`)
                .toLocaleString(locale, {
                    weekday: 'long',
                })
                .toLowerCase()
                .slice(0, length),
        );
    };

    /**
     * Gets the first day of the week for a given date, based on a chosen first day of the week.
     * @param date - The date for which to calculate the first day of the week.
     * @param weekFirstDay - The day considered the start of the week.
     */
    static getDateWeekFirstDay = (
        date: Date = new Date(),
        weekFirstDay: Weekdays = Variable['--ofa-week-first-day'],
    ) => {
        const a: { [key in Weekdays]: number } = {
            Sunday: 0,
            Monday: 1,
            Tuesday: 2,
            Wednesday: 3,
            Thursday: 4,
            Friday: 5,
            Saturday: 6,
        };

        const b = Calendar.getDateResetToMidnight(date);
        let c = b.getDay() - a[weekFirstDay];
        if (c < 0) c = 7 + c;

        return new Date(b.setTime(b.getTime() - c * 86400000));
    };

    /**
     * Gets the week number for a given date.
     * @param date - The date for which to calculate the week number.
     * @param weekFirstDay - The day considered the start of the week.
     * @param firstWeekStartingDate - The date that begins the week 1 of a year.
     */
    static getDateWeekNumber = (
        date: Date = new Date(),
        weekFirstDay: Weekdays = Variable['--ofa-week-first-day'],
        firstWeekStartingDate: number = Variable['--ofa-first-week-starting-date'],
    ) => {
        const a = Calendar.getDateWeekFirstDay(new Date(date), weekFirstDay);
        const b = new Date(a.getFullYear(), 0, firstWeekStartingDate);
        const c = Calendar.getDateWeekFirstDay(b, weekFirstDay);

        // Adjust for edge cases where the week number might be 53 or 54.
        let d = Math.round((a.getTime() - c.getTime()) / 86400000 / 7 + 1);
        if (d === 53 && a.getDate() > 24 + firstWeekStartingDate) d = 1;
        if (d === 54) d = 1;

        return d;
    };

    /**
     * Gets a list of years in a table format, centered around a specified year.
     * @param year - The year around which the list is generated.
     * @param startingYear - The year that will be in position 1.
     * @param tableLength - The total number of years in the generated list.
     */
    static generateYearModeTable = (year: number, startingYear: number = 2000, tableLength: number = 12) => {
        let a = (year - startingYear) % tableLength;
        if (a < 0) a = tableLength + a;
        const b = year - a;
        return Array.from(Array(tableLength).keys()).map((x) => b + x);
    };

    /**
     * Generates a list of dates in a table format, centered around a specified date.
     * @param date - The central date around which to generate the list.
     * @param tableLengthInWeek - The total number of weeks in the generated list.
     * @param weekFirstDay - The day considered the start of the week.
     */
    static generateDayModeTable = (
        date: Date,
        tableLengthInWeek: number = 6,
        weekFirstDay: Weekdays = Variable['--ofa-week-first-day'],
    ) => {
        const a = Calendar.getDateWeekFirstDay(new Date(new Date(date).setDate(1)), weekFirstDay);
        return [
            new Date(a),
            ...Array.from(Array(7 * tableLengthInWeek - 1).keys()).map(() => new Date(a.setDate(a.getDate() + 1))),
        ];
    };
}
