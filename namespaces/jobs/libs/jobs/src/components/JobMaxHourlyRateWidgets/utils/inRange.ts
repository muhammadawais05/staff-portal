export type HourlyRateRange = number | { from?: number; to?: number }

export const inRange = (value: number, range: HourlyRateRange) => {
  return typeof range === 'number'
    ? value <= range
    : (range.from === undefined || value >= range.from) &&
        (range.to === undefined || value <= range.to)
}
