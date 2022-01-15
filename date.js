/**
 *
 * Class PrettyDate
 *
 * An extension of the javascript native Date object,
 * enriched with several formatting helper methods.
 *
 * Copyright (c) Yannoff
 *
 */
export class PrettyDate extends Date {

    /**
     * Map formatting sequences with their rendering method
     */
    map = {
        // Day
        '%d': 'getPrettyDate',
        '%j': 'getDate',
        '%w': 'getDay',
        '%N': 'getHumanDay',
        '%D': 'getDayShortName',
        // Month
        '%m': 'getPrettyMonth',
        '%n': 'getHumanMonth',
        '%M': 'getMonthShortName',
        // Year
        '%Y': 'getFullYear',
        '%y': 'getShortYear',
        // Time
        '%H': 'getPrettyHours',
        '%G': 'getHours',
        '%i': 'getPrettyMinutes',
        '%s': 'getPrettySeconds',
        '%U': 'getUnixTime',
        '%c': 'toISO8601',
    }

    /**
     * Store the info deduced from the toString() method
     */
    info = {
        day: '', // 3-letters day of week name representation
        month: '', // 3-letters month name representation
        date: '', // 2-digits day-of-the-month representation
        year: '', // 4-digits year representation
        time: '', // 24-hour time representation (HH:MM:SS)
        offset: '', // Local timezone offset representation (eg: GMT+0200)
        timezone: '', // Local timezone name or abbreviation representation
    };

    constructor(v = undefined, m = undefined, d = undefined, h = undefined, mn = undefined, s = undefined, ms = undefined)
    {
        super(...arguments);
        // Populate the info property with date infos
        this.info = this._getDateParts();
    }

    /**
     * Add a leading zero to one-digit values
     */
    _normalize(value)
    {
        return (value > 9 ? "" : "0") + value;
    }

    /**
     * Return a hash of basic date info deduced from the toString() method
     */
    _getDateParts()
    {
        let data = this.toString().split(' ');
        return {
            day: data.shift(),
            month: data.shift(),
            date: data.shift(),
            year: data.shift(),
            time: data.shift(),
            offset: data.shift(),
            timezone: data.join(' '),
        }
    }

    /**
     * Return the 2-digit string representation of the year
     */
    getShortYear()
    {
        return ("" + this.getFullYear()).substring(2);
    }

    /**
     * Return the string representation of the century
     */
    getCentury()
    {
        return ("" + this.getFullYear()).substring(0, 2);
    }

    /**
     * Return the human-indexed month number
     */
    getHumanMonth()
    {
        return this.getMonth() + 1;
    }

    /**
     * Return the human-indexed week-day number
     */
    getHumanDay()
    {
        return this.getDay() || 7;
    }

    /**
     * Return the 3-letters month name
     */
    getMonthShortName()
    {
        return this.info['month'];
    }

    /**
     * Return the 3-letters day-of-the-week name
     */
    getDayShortName()
    {
        return this.info['day'];
    }

    /**
     * Return a 2-digits string representation of the human-indexed month
     */
    getPrettyMonth()
    {
        return this._normalize(this.getHumanMonth());
    }

    /**
     * Return a 2-digits string representation of the month-day
     */
    getPrettyDate()
    {
        return this._normalize(this.getDate());
    }

    /**
     * Return a 2-digits, 24-hour, string representation of the hours
     */
    getPrettyHours()
    {
        return this._normalize(this.getHours());
    }

    /**
     * Return a 2-digits string representation of the minutes
     */
    getPrettyMinutes()
    {
        return this._normalize(this.getMinutes());
    }

    /**
     * Return a 2-digits string representation of the seconds
     */
    getPrettySeconds()
    {
        return this._normalize(this.getSeconds());
    }

    /**
     * Return the elapsed time since Unix epoch (in seconds)
     */
    getUnixTime()
    {
        return this.getTime() / 1000;
    }

    /**
     * Return a user-defined formatted string representation of the Date
     *
     * @param String|null fmt Optional PHP-Flavoured formatting string
     *
     */
    format(fmt = null)
    {
        if (fmt) {
            let str = fmt;
            for (let modifier in this.map) {
                if (!str.includes(modifier)) {
                    continue;
                }
                let method = this.map[modifier];
                str = str.replace(modifier, this[method]());
            }
            return str;
        }
        return this.toISO8601();
    }

    /**
     * Return the base ISO-8601 string representation of the full date
     *
     * @param String separator Character used between the date and time part of the string
     *
     */
    toISO8601(separator = 'T')
    {
        return [ this.toISO8601Date(), this.toISO8601Time() ].join(separator);
    }

    /**
     * Return the base ISO-8601 string representation of the time
     *
     * @param String separator Character used between the hours/minutes/seconds
     *
     */
    toISO8601Time(separator = ':')
    {
        return [ this.getPrettyHours(), this.getPrettyMinutes(), this.getPrettySeconds() ].join(separator);
    }

    /**
     * Return the base ISO-8601 string representation of the date
     *
     * @param String separator Character used between the year/month/day
     *
     */
    toISO8601Date(separator = '-')
    {
        return [ this.getFullYear(), this.getPrettyMonth(), this.getPrettyDate() ].join(separator);
    }
}
