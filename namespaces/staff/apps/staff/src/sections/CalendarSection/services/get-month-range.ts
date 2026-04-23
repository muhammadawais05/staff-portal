import { getDateString, setDate, setMonth } from '@staff-portal/date-time-utils'

const getMonthRange = (date: Date) => {
  const from = setDate(date, 1)
  const till = setDate(setMonth(date, date.getMonth() + 1), 0)

  return ({
    from: getDateString(from),
    till: getDateString(till)
  })
}

export default getMonthRange
