export const convertObjectToSelectOptions = <TValue extends string = string>(
  object?: Record<string, string>
) => {
  if (!object) {
    return []
  }

  return Object.keys(object).map(key => ({
    text: object[key],
    value: key as TValue
  }))
}
