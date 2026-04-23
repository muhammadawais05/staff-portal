import { UpdateClientPrimaryRegionInput } from '@staff-portal/graphql/staff'
import { ValuesToAdjust } from '@staff-portal/editable'

type Key = keyof Pick<UpdateClientPrimaryRegionInput, 'primaryRegionId'>

export const adjustPrimaryRegionId = ({
  primaryRegionId
}: ValuesToAdjust<UpdateClientPrimaryRegionInput, 'primaryRegionId'>): {
  [key in Key]: UpdateClientPrimaryRegionInput['primaryRegionId']
} => ({
  primaryRegionId: primaryRegionId || null
})
