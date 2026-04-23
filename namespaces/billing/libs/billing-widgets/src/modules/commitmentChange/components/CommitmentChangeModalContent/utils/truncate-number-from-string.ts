export const truncateNumberFromString = (value: string | undefined | null) =>
  value ? `${Number.parseInt(value)}` : '0'
