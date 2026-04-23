import { PatchClientProfileInput } from '@staff-portal/graphql/staff'

const isValueChanged = <T extends PatchClientProfileInput>(
  key: keyof T,
  initialValues: Partial<T>,
  input: Partial<T>
) => {
  if (input.resetTotalFunding) {
    return initialValues.totalFunding != null
  }

  const prevValue = initialValues[key] ?? null
  const newValue = input[key] ?? null

  if (Array.isArray(prevValue)) {
    if (Array.isArray(newValue) && prevValue.length === newValue.length) {
      return newValue.some((value, index) => value !== prevValue[index])
    }

    return true
  }

  return prevValue !== newValue
}

export default isValueChanged
