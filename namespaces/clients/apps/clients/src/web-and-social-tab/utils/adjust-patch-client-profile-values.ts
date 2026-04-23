import { Maybe, PatchClientProfileInput } from '@staff-portal/graphql/staff'

type ValueOf<T> = T[keyof T]

export const adjustPatchClientProfileValues = (
  key: keyof PatchClientProfileInput,
  value: ValueOf<PatchClientProfileInput>,
  currentEmployeeCount?: Maybe<number>
) => {
  if (key === 'revenueRange' && value === undefined) {
    return {
      currentEmployeeCount,
      revenueRange: ''
    }
  }

  if (key === 'currentEmployeeCount') {
    if (value === '') {
      return {
        resetCurrentEmployeeCount: true
      }
    }

    const count =
      value === null || value === undefined
        ? value
        : parseInt(value.toString()) || 0

    return {
      currentEmployeeCount: count
    }
  }

  return {
    currentEmployeeCount,
    [key]: value
  }
}
