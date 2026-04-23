import { AvailabilityRequestStatus } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import {
  jobAvailabilityRequestsItemMock,
  jobAvailabilityRequestsMock
} from '~integration/mocks/fragments'
import jobMock from '~integration/mocks/job-mock'

export const jobAvailabilityRequestsSectionMock = (
  requestStatuses: AvailabilityRequestStatus[]
) => ({
  ...jobMock({
    ...jobAvailabilityRequestsMock({
      availabilityRequests: {
        nodes: requestStatuses.map(status =>
          jobAvailabilityRequestsItemMock({
            status,
            id: encodeEntityId(status, 'AvailabilityRequest')
          })
        ),
        totalCount: requestStatuses.length
      }
    }).node(),
    id: encodeEntityId('123', 'Job')
  })
})
