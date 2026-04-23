import { monthYearFormatter } from '@staff-portal/date-time-utils'
import { isNotNullish } from '@staff-portal/utils'

export const getCertificationDate = (
  month?: number | null,
  year?: number | null
) => {
  if (!isNotNullish(year) || !isNotNullish(month)) {
    return null
  }

  return monthYearFormatter(year, month)
}
