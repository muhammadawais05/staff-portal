export const generateDetailedListRows = <T>(
  items: T[],
  rows: number
): T[][] => {
  const maxNumberOfRows = Math.ceil(items.length / rows)

  return items.reduce((acc, curr, index) => {
    if (index < maxNumberOfRows) {
      acc.push([curr])
    } else {
      const currentIndex =
        index - Math.floor(index / maxNumberOfRows) * maxNumberOfRows

      acc[currentIndex].push(curr)
    }

    return acc
  }, [] as T[][])
}
