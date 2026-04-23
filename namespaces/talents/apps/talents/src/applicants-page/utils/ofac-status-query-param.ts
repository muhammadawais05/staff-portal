import { OfacStatus } from '@staff-portal/graphql/staff'
import { asQueryParam } from '@staff-portal/query-params-state'

export const ofacStatusQueryParam = asQueryParam({
  encode: (value: OfacStatus[]) => value,
  decode: (value: string | string[]) => {
    const ofacStatuses = Array.isArray(value) ? value : [value]

    return ofacStatuses
      .map(
        status =>
          (
            OfacStatus[status.toUpperCase() as keyof typeof OfacStatus] ?? ''
          ).toLowerCase() as OfacStatus
      )
      .filter(Boolean)
  }
})
