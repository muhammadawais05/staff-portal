import { UpdateClientSecondaryRegionInput } from '@staff-portal/graphql/staff'
import { ValuesToAdjust } from '@staff-portal/editable'

type Key = keyof Pick<UpdateClientSecondaryRegionInput, 'secondaryRegionId'>

export const adjustSecondaryRegionId = ({
  secondaryRegionId
}: ValuesToAdjust<UpdateClientSecondaryRegionInput, 'secondaryRegionId'>): {
  [key in Key]: UpdateClientSecondaryRegionInput['secondaryRegionId']
} => ({
  secondaryRegionId: secondaryRegionId || null
})
