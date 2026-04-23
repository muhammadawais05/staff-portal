import { PatchClientProfileInput } from '@staff-portal/graphql/staff'
import { ValuesToAdjust } from '@staff-portal/editable'
import { isEmpty } from '@staff-portal/utils'

type Key = keyof Pick<PatchClientProfileInput, 'acquiredBy'>

export const adjustAcquiredBy = ({
  acquiredBy
}: ValuesToAdjust<PatchClientProfileInput, 'acquiredBy', string | string[]>): {
  [key in Key]: NonNullable<PatchClientProfileInput['acquiredBy']>
} => {
  if (Array.isArray(acquiredBy)) {
    return { acquiredBy }
  }

  return {
    acquiredBy: isEmpty(acquiredBy)
      ? []
      : acquiredBy.split(',').map(text => text.trim())
  }
}
