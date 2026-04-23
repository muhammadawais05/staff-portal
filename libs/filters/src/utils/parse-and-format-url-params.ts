export const parseStringArray = <T = string>(
  values: unknown,
  upperCase?: boolean
) => {
  if (Array.isArray(values)) {
    const result = upperCase
      ? (values as string[]).map(value => value.toUpperCase())
      : values

    return result as T[]
  }

  return undefined
}

export const parseString = <T = string>(
  value: unknown,
  upperCase?: boolean
) => {
  if (!value || typeof value !== 'string') {
    return
  }

  return (upperCase ? value.toUpperCase() : value) as unknown as T
}

export const parseNumericString = (
  value: unknown,
  options: { leadingDigitsOnly: boolean } = { leadingDigitsOnly: true }
) => {
  if (!value || typeof value !== 'string') {
    return undefined
  }

  if (options.leadingDigitsOnly) {
    return value.replace(/^([0-9]*)[^0-9]*.*/, '$1') || undefined
  }

  return value.replace(/[^0-9]/g, '') || undefined
}

export const parseBoolean = (value?: unknown) => {
  if (value === 'true' || value === 'yes') {
    return true
  }

  if (value === 'false') {
    return false
  }
}
