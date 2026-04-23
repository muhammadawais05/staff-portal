import { UpdateOpportunityInput } from '@staff-portal/graphql/staff'
import { isNotNullish } from '@staff-portal/utils'

type ValueOf<T> = T[keyof T]

const INT_FIELDS = ['budget', 'poAmount', 'probability', 'value']

export const adjustUpdateOpportunityValues = (
  key: keyof UpdateOpportunityInput,
  value: ValueOf<UpdateOpportunityInput>
) => {
  if (INT_FIELDS.includes(key)) {
    const parsedValue = isNotNullish(value)
      ? parseInt(value.toString()) || 0
      : value

    return {
      [key]: parsedValue
    }
  }

  if (key === 'highPriority') {
    return {
      [key]: value === 'true'
    }
  }

  return {
    [key]: value
  }
}
