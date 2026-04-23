import { PatchClientProfileInput } from '@staff-portal/graphql/staff'
import { ValuesToAdjust } from '@staff-portal/editable'

type Key = keyof Pick<PatchClientProfileInput, 'contactName'>

export const adjustContactName = ({
  contactName
}: ValuesToAdjust<PatchClientProfileInput, 'contactName'>): {
  [key in Key]: NonNullable<PatchClientProfileInput['contactName']>
} => {
  return {
    contactName: contactName?.trim() ?? ''
  }
}
