export const splitTotalsInChunks = <T>(
  array: T[] = [],
  chunkSize = 4,
  splitMinSize = 6
) => {
  if (array.length <= splitMinSize) {
    return [array]
  }

  return array.reduce((acc, _, index) => {
    const arrayChunk = array.slice(
      chunkSize * index,
      chunkSize * index + chunkSize
    )

    if (!arrayChunk.length) {
      return acc
    }

    return [...acc, arrayChunk]
  }, [] as T[][])
}
