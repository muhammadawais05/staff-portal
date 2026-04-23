import { TalentInfractionReasonValue } from '@staff-portal/graphql/staff'
import { asQueryParam } from '@staff-portal/query-params-state'

export const ReasonSlugQueryParam = asQueryParam({
  decode: (value: string) =>
    TalentInfractionReasonValue[
      value.toUpperCase() as keyof typeof TalentInfractionReasonValue
    ] as TalentInfractionReasonValue,
  encode: (value: TalentInfractionReasonValue) => value.toLowerCase()
})
