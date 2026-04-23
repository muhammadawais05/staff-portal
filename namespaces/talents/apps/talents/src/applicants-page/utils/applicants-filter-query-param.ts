import { SearchApplicantsFilter } from '@staff-portal/graphql/staff'
import { asQueryParam } from '@staff-portal/query-params-state'

export const applicantsFilterQueryParam = asQueryParam({
  encode: (value: SearchApplicantsFilter) => value,
  decode: (value: string) =>
    (
      SearchApplicantsFilter[
        value.toUpperCase() as keyof typeof SearchApplicantsFilter
      ] ?? ''
    ).toLowerCase() as SearchApplicantsFilter
})
