import {
  AvailabilityRequestConnectionResolvers,
  AvailabilityRequestStatus
} from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import { jobAvailabilityRequestsItemMock } from '~integration/mocks/fragments'
import { convertToResolver } from '~integration/utils'

const updateJobAvailabilityRequestsFilterStatusMocks = (
  status: AvailabilityRequestStatus
) => {
  cy.updateStaffMocks({
    AvailabilityRequestConnection: convertToResolver<
      AvailabilityRequestConnectionResolvers,
      'AvailabilityRequestConnection'
    >({
      nodes: [
        jobAvailabilityRequestsItemMock({
          status,
          id: encodeEntityId(status, 'AvailabilityRequest')
        })
      ],
      totalCount: 1
    })
  })
}

export default updateJobAvailabilityRequestsFilterStatusMocks
