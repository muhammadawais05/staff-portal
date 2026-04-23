import { Activity } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import { getActivityResponse } from '~integration/mocks/responses'
import sharedCardTaskStubs from './shared-card-task-stubs'

const updateActivityCardTaskStubs = () => {
  const activity = {
    id: encodeEntityId('123', 'Activity'),
    __typename: 'Activity'
  } as unknown as Activity

  cy.stubGraphQLRequests({
    ...sharedCardTaskStubs({ activity }),
    GetActivity: getActivityResponse({ activity })
  })
}

export default updateActivityCardTaskStubs
