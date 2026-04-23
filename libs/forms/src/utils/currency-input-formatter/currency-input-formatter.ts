export type CurrencyInputFormatterOptions = {
  allowDecimals: boolean
  precision?: number
}

const currencyInputFormatter =
  ({ allowDecimals, precision }: CurrencyInputFormatterOptions) =>
  (value: string | number | undefined | null) => {
    let normalizedValue = value?.toString().trim() ?? null

    if (!normalizedValue) {
      return ''
    }

    if (normalizedValue[0] === '.') {
      normalizedValue = `0${normalizedValue}`
    }

    let numericValue = Number(normalizedValue.replace(',', '.'))

    if (isNaN(numericValue)) {
      return ''
    }

    if (!numericValue) {
      return Number(0).toFixed(precision ?? 2)
    }

    if (numericValue < 0) {
      numericValue = 0
    }

    if (!allowDecimals) {
      numericValue = Math.floor(numericValue)
    }

    return numericValue.toFixed(precision ?? 2)
  }

export default currencyInputFormatter
