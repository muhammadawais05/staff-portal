import pluralize from 'pluralize'

const defaultValueGetter = (value: number | null | undefined) =>
  value === null || value === undefined ? 'no_preference' : `HOUR_${value}`

export const getHoursOfOverlap = ({
  maxHoursOverlap,
  valueGetter = defaultValueGetter
}: {
  maxHoursOverlap: number
  valueGetter?: (value: number | null | undefined) => string
}) => {
  const hoursToOptions = Array.from(new Array(maxHoursOverlap + 1).keys())
    .filter(key => !!key)
    .map(value => ({
      text: `${value} ${pluralize('hour', value)}`,
      value: valueGetter(value)
    }))

  return [
    {
      text: 'No preference',
      value: valueGetter(null)
    },
    ...hoursToOptions
  ]
}
