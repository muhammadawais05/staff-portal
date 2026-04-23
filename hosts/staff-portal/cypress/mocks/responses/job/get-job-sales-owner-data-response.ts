import { Job } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import { hiddenOperationMock } from '~integration/mocks'

export const getJobSalesOwnerDataResponse = (job?: Partial<Job>) => ({
  data: {
    node: {
      id: encodeEntityId('123', 'Job'),
      currentSalesOwner: null,
      ...job,
      operations: {
        updateJobSalesOwner: hiddenOperationMock(),
        ...job?.operations,
        __typename: 'JobOperations'
      },
      __typename: 'Job'
    }
  }
})
