const joinTruthy = (array: unknown[], separator = ', '): string =>
  array.filter(item => item).join(separator)

export default joinTruthy
