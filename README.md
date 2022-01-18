# yannoff/pretty-date
 
An extension of the javascript native Date object enriched with formatting helper methods.

## Usage

```javascript
import { PrettyDate } from './path/to/pretty-date/date.js'

let d = new PrettyDate('Sat Jan 15 15:13:54 2022');

console.log(PrettyDate.format('%d/%m/%Y %H:%i:%s'));
// output: 15/01/2022 15:13:54
```

## Reference

### Methods

#### `format(fmt = null)`

Return a formatted string representation of the Date. _Supports basic [PHP-flavoured](https://www.php.net/manual/en/datetime.format.php) formatting syntax._

##### Arguments

Name|Description
---|---
`fmt`| Optional formatting string. See the [modifiers](#format-modifiers) for a full list of supported sequences.<br/>If none provided, the ISO-8601 format will be used.

#### `getShortYear()`

Return the 2-digits representation of the year.

#### `getCentury()`

Return the string representation of the century.

#### `getHumanMonth()`

Return the human-indexed month (`1` for january through `12` for december).

#### `getHumanDay()`

Return the human-indexed day of week (`1` for monday through `7` for sunday).

#### `getMonthShortName()`

Return the 3-letters month name (`Jan` through `Dec`).

#### `getDayShortName()`

Return the 3-letters day-of-the-week name (`Mon` through `Sun`).

#### `getPrettyMonth()`

Return the 2-digits, human-indexed month with leading zero (`01` for january through `12` for december).

#### `getPrettyDate()`

Return the 2-digits day of month with leading zero (`01` through `31`).

#### `getPrettyHours()`

Return the 2-digits, 24-hour hours representation with leading zeros (`00` through `23`).

#### `getPrettyMinutes()`

Return the 2-digits minutes representation with leading zeros (`00` through `59`).

#### `getPrettySeconds()`

Return the 2-digits seconds representation with leading zeros (`00` through `59`).

#### `getUnixTime()`

Return the elapsed time since Unix epoch (in seconds).

#### `toISO8601(separator = 'T')`

Return the base ISO-8601 representation of the full date (eg: `2022-01-17T21:54:45`).

##### Arguments

Name|Description|Defaults
---|---|---
`separator`|Character used between the date and time part of the string|`T`

#### `toISO8601Time(separator = ':')`

Return the base ISO-8601 representation of the time (eg: `21:54:45`).

##### Arguments

Name|Description|Defaults
---|---|---
`separator`|Character used between the hours/minutes/seconds|`:`

#### `toISO8601Date(separator = '-')`

Return the base ISO-8601 representation of the date (eg: `2022-01-17`).

##### Arguments

Name|Description|Defaults
---|---|---
`separator`|Character used between the date parts|`-`

### Format modifiers

_Here are the supported formatting modifiers and their associated methods:_


#### Day

modifier|method|description
---|---|---
`%d`| `getPrettyDate`|2-digits day of month, with leading zero
`%j`| `getDate`|Day of month without leading zero
`%w`| `getDay`|Day of week - 0 (sunday) to 6 (saturday)
`%N`| `getHumanDay`|Day of week - 1 (monday) to 7 (sunday)
`%D`| `getDayShortName`|3-letters day of the week name

#### Month

modifier|method|description
---|---|---
`%m`| `getPrettyMonth`| 2-digits month number, with leading zero
`%n`| `getHumanMonth`| Month number, without leading zero
`%M`| `getMonthShortName`|3-letters month name

#### Year

modifier|method|description
---|---|---
`%Y`| `getFullYear`|4-digits representation of the year
`%y`| `getShortYear`|2-digits representation of the year

#### Time

modifier|method|description
---|---|---
`%H`| `getPrettyHours`|24-hour format with leading zeros
`%G`| `getHours`|24-hour format without leading zeros
`%i`| `getPrettyMinutes`|2-digits minutes with leading zeros
`%s`| `getPrettySeconds`|2-digits seconds with leading zeros
`%U`| `getUnixTime`|Elapsed seconds since Unix Epoch
`%c`| `toISO8601`|ISO 8601 full date


## License

Licensed under the [ISC License](LICENSE).
