import { Job, CumulativeJobStatus } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import { hiddenOperationMock } from '../../hidden-operation-mock'

export const getJobDeleteDetailsResponse = (job?: Partial<Job>) => ({
  data: {
    node: {
      id: encodeEntityId('123', 'Job'),
      cumulativeStatus: CumulativeJobStatus.ACTIVE,
      ...job,
      operations: {
        refundJobDeposit: hiddenOperationMock(),
        ...job?.operations,
        __typename: 'JobOperations'
      },
      client: {
        id: encodeEntityId('123', 'Client'),
        depositInvoices: {
          nodes: []
        },
        ...job?.client,
        __typename: 'Client'
      },
      possiblyRelatedMeetings: {
        nodes: []
      },
      __typename: 'Job'
    }
  }
})
