import { isWithinInterval as getIsWithinInterval, parseISO } from 'date-fns'

export const isWithinDateInterval = ({
  date,
  start,
  end
}: {
  date?: string
  start: string
  end: string
}) => {
  const dateValue = date ? parseISO(date) : new Date()
  const startValue = parseISO(start)
  const endValue = parseISO(end)

  return getIsWithinInterval(dateValue, {
    start: startValue,
    end: endValue
  })
}
