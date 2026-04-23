export const getHoursOverlapValue = (value: number | null | undefined) =>
  value === null || value === undefined ? '' : 'HOUR_' + value
