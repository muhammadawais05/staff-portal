import { ClaimerFragment } from './claimer-fragment.staff.gql.types'

export const createClaimerFragmentMock = (
  claimer?: Partial<ClaimerFragment>
): ClaimerFragment => ({
  id: claimer?.id || 'mock-id',
  fullName: claimer?.fullName || 'mock-fullName'
})
