export const formatAsPercentage = (value: number, precision = 0) =>
  `${(value * 100).toFixed(precision)}%`
