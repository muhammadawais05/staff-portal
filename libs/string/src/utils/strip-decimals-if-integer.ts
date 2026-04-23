export const stripDecimalsIfInteger = (value: string | number) => {
  const valueAsString = typeof value === 'number' ? value.toString() : value

  if (Number.isInteger(Number(valueAsString))) {
    return Number(value).toFixed(0)
  }

  return valueAsString
}

export default stripDecimalsIfInteger
