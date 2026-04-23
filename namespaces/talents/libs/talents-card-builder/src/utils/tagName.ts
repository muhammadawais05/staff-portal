const localeCompareSupportsLocales = () => {
  try {
    'foo'.localeCompare('bar', 'i')
  } catch (e: unknown) {
    if (e instanceof Error) {
      return e.name === 'RangeError'
    }
  }

  return false
}

const compareNames = localeCompareSupportsLocales()
  ? (name1: string, name2: string) =>
      name1.localeCompare(name2, 'en', {
        sensitivity: 'base',
        numeric: true
      })
  : (name1: string, name2: string) => name1.localeCompare(name2)

export const compareTagNames = (name1: string, name2: string) => {
  return compareNames(name1, name2)
}
