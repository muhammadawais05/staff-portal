import {
  AvailabilityRequestStatus,
  TalentResolvers
} from '@staff-portal/graphql/staff'

import {
  jobAvailabilityRequestsSectionMock,
  talentNodeMock
} from '~integration/mocks/fragments'
import { convertToResolver } from '~integration/utils'

const ALL_STATUSES = Object.values(AvailabilityRequestStatus)

const updateJobAvailabilityRequestsSectionsMocks = () => {
  cy.updateStaffMocks({
    Talent: convertToResolver<TalentResolvers, 'Talent'>(
      talentNodeMock().node()
    ),
    Query: {
      node: () => jobAvailabilityRequestsSectionMock(ALL_STATUSES)
    }
  })
}

export default updateJobAvailabilityRequestsSectionsMocks
