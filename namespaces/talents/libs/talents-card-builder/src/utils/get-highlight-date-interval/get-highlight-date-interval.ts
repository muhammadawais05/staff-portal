export const getHighlightDateInterval = (
  startDate?: string | number | null,
  endDate?: string | number | null
) => {
  if (!startDate) {
    return null
  }

  const till = endDate ? endDate : 'PRESENT'

  return `(${startDate} - ${till})`
}
