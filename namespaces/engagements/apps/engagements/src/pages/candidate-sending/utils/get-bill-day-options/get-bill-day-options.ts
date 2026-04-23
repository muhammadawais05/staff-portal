import { WeekDay } from '@staff-portal/graphql/staff'
import { titleize } from '@staff-portal/string'

const sortOrder: Record<string, number> = {
  [WeekDay.SUNDAY]: 0,
  [WeekDay.MONDAY]: 1,
  [WeekDay.TUESDAY]: 2,
  [WeekDay.WEDNESDAY]: 3,
  [WeekDay.THURSDAY]: 4,
  [WeekDay.FRIDAY]: 5,
  [WeekDay.SATURDAY]: 6
}

export const getSortedBillDays = () =>
  Object.keys(sortOrder).sort((firstItem, secondItem) => {
    return sortOrder[firstItem] - sortOrder[secondItem]
  })

const getBillDayOptions = () =>
  getSortedBillDays().map(day => ({
    text: titleize(day),
    value: day
  }))

export default getBillDayOptions
