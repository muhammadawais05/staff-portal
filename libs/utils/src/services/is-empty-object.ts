export const isEmptyObject = (obj?: object) => {
  if (!obj) {
    return true
  }

  // eslint-disable-next-line no-unreachable-loop
  for (const _ in obj) {
    return false
  }

  return true
}
