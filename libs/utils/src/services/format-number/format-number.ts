export const formatNumber = (number: number) =>
  Intl?.NumberFormat?.('en-US', { maximumSignificantDigits: 3 }).format(
    number
  ) || number
