import { utcToZonedTime } from 'date-fns-tz';

export const getCurrentDateWithTimeZone = (timezone: string) => utcToZonedTime(new Date(), timezone)
