export const formatRate = (rate?: string | null) => {
  const rateAsNumber = Number(rate ?? '')

  return rateAsNumber.toFixed(2)
}
