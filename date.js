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


/**
 * Map formatting sequences with their rendering method
 */
let _map = {
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
};

/**
 * Add a leading zero to one-digit values
 *
 * @param int value
 */
function _normalize(value)
{
    return (value > 9 ? "" : "0") + value;
}

/**
 * Return a hash of basic date info deduced from the Date::toString() method
 *
 * @param Date d
 */
function _getDateParts(d)
{
    let data = d.toString().split(' ');
    return {
        day: data.shift(), // 3-letters day of week name representation
        month: data.shift(), // 3-letters month name representation
        date: data.shift(), // 2-digits day-of-the-month representation
        year: data.shift(), // 4-digits year representation
        time: data.shift(), // 24-hour time representation (HH:MM:SS)
        offset: data.shift(), // Local timezone offset representation (eg: GMT+0200)
        timezone: data.join(' '), // Local timezone name or abbreviation representation
    }
}

export class PrettyDate extends Date
{
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
        return _getDateParts(this).month;
    }

    /**
     * Return the 3-letters day-of-the-week name
     */
    getDayShortName()
    {
        return _getDateParts(this).day;
    }

    /**
     * Return a 2-digits string representation of the human-indexed month
     */
    getPrettyMonth()
    {
        return _normalize(this.getHumanMonth());
    }

    /**
     * Return a 2-digits string representation of the month-day
     */
    getPrettyDate()
    {
        return _normalize(this.getDate());
    }

    /**
     * Return a 2-digits, 24-hour, string representation of the hours
     */
    getPrettyHours()
    {
        return _normalize(this.getHours());
    }

    /**
     * Return a 2-digits string representation of the minutes
     */
    getPrettyMinutes()
    {
        return _normalize(this.getMinutes());
    }

    /**
     * Return a 2-digits string representation of the seconds
     */
    getPrettySeconds()
    {
        return _normalize(this.getSeconds());
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
            for (let modifier in _map) {
                if (!str.includes(modifier)) {
                    continue;
                }
                let method = _map[modifier];
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
