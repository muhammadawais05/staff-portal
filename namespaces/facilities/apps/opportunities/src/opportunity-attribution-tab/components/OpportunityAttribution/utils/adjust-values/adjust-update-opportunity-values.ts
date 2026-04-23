import { UpdateOpportunityInput } from '@staff-portal/graphql/staff'

type ValueOf<T> = T[keyof T]

export const adjustUpdateOpportunityValues = (
  key: keyof UpdateOpportunityInput,
  value: ValueOf<UpdateOpportunityInput>
) => {
  return {
    [key]: value
  }
}
