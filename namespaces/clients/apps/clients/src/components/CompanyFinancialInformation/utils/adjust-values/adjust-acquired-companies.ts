import { PatchClientProfileInput } from '@staff-portal/graphql/staff'
import { ValuesToAdjust } from '@staff-portal/editable'
import { isEmpty } from '@staff-portal/utils'

type Key = keyof Pick<PatchClientProfileInput, 'acquiredCompanies'>

export const adjustAcquiredCompanies = ({
  acquiredCompanies
}: ValuesToAdjust<
  PatchClientProfileInput,
  'acquiredCompanies',
  string | string[]
>): {
  [key in Key]: NonNullable<PatchClientProfileInput['acquiredCompanies']>
} => {
  if (Array.isArray(acquiredCompanies)) {
    return { acquiredCompanies }
  }

  return {
    acquiredCompanies: isEmpty(acquiredCompanies)
      ? []
      : acquiredCompanies.split(',').map(text => text.trim())
  }
}
