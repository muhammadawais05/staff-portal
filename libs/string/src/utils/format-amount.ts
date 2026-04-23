export const formatAmount = (
  amount: number | string | undefined | null,
  fractionDigits = 0
) => {
  if (amount === null || amount === undefined) {
    return amount
  }

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits
  })

  if (typeof amount === 'string') {
    return formatter.format(parseFloat(amount))
  }

  return formatter.format(amount)
}
