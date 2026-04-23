import { differenceInDays, parseISO } from 'date-fns'

export const getDifferenceInDaysFromNow = (date: string) =>
  differenceInDays(new Date(), parseISO(date))
