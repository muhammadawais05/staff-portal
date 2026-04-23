import { parse } from 'chrono-node'

const parseHumanReadableDate = (value: string): Date | null | undefined => {
  const parsedResults = parse(
    value,
    {
      instant: new Date()
    },
    {
      forwardDate: true
    }
  )
  const parsedResult = parsedResults?.[0]

  if (!parsedResult) {
    return null
  }

  const date = parsedResult.date()
  const timezoneOffset = parsedResult.start.get('timezoneOffset')

  if (!timezoneOffset) {
    const userTimezoneOffset = date.getTimezoneOffset() * 60000

    date.setTime(date.getTime() + userTimezoneOffset)
  }

  return date
}

export default parseHumanReadableDate
