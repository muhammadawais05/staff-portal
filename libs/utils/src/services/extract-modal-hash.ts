export const extractModalHash = (hash: string | null) => {
  if (!hash) {
    return null
  }

  const startIndex = hash.indexOf('#modal')

  if (startIndex === -1) {
    return null
  }

  const endIndexes = ['#']
    .map(char => hash.indexOf(char, startIndex + 1))
    .filter(index => index !== -1)

  return endIndexes.length === 0
    ? hash.substring(startIndex)
    : hash.substring(startIndex, Math.min(...endIndexes))
}
