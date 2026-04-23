import { TalentActivationFilter } from '@staff-portal/graphql/staff'
import { asQueryParam } from '@staff-portal/query-params-state'

export const activationFilterTypeQueryParam = asQueryParam({
  encode: (value: TalentActivationFilter) => value,
  decode: (value: string) =>
    (
      TalentActivationFilter[
        value.toUpperCase() as keyof typeof TalentActivationFilter
      ] ?? ''
    ).toLowerCase() as TalentActivationFilter
})
