import { RateChangeRequestTypeEnum } from '@staff-portal/graphql/staff'
import { asQueryParam } from '@staff-portal/query-params-state'

export const RequestTypeQueryParam = asQueryParam({
  decode: (value: string) =>
    RateChangeRequestTypeEnum[
      value.toUpperCase() as keyof typeof RateChangeRequestTypeEnum
    ] as RateChangeRequestTypeEnum,
  encode: (value: RateChangeRequestTypeEnum) => value.toLowerCase()
})
