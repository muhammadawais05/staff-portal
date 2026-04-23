export const normalizeCurrencyAmount = (value?: string | number | null) => {
  if (value === undefined || value === null) {
    return undefined
  }

  const numericValue = Number(value)

  if (isNaN(numericValue)) {
    return undefined
  }

  return numericValue.toFixed(2)
}
