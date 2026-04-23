import {
  Job,
  EngagementResolvers,
  CommitmentChangeRequest,
  OperationCallableTypes
} from '@staff-portal/graphql/staff'

import { jobMock, recipientMock } from '~integration/mocks'
import { engagementNodeMock } from '~integration/mocks/fragments'
import { convertToResolver } from '~integration/utils'
import { successMutationMock } from '~integration/mocks/mutations'
import { operationMock } from '~integration/mocks/operations'

const updateCommitmentChangeRequestMocks = ({
  partialJob,
  approveCommitmentChangeRequestCallable = OperationCallableTypes.HIDDEN,
  rejectCommitmentChangeRequestCallable = OperationCallableTypes.HIDDEN
}: Partial<{
  partialJob: Partial<Job>
  approveCommitmentChangeRequestCallable: OperationCallableTypes
  rejectCommitmentChangeRequestCallable: OperationCallableTypes
}> = {}) => {
  const engagement = engagementNodeMock().node()
  const emailRecipient = recipientMock()

  const job: Partial<Job> = {
    engagements: {
      nodes: [engagement],
      edges: [],
      totalCount: 1
    },
    pendingCommitmentChangeRequest: {
      id: 'VjEtQ29tbWl0bWVudENoYW5nZVJlcXVlc3QtMTIzNDQz',
      changeDate: '2021-11-08',
      createdAt: '2021-11-02T20:57:44+03:00',
      newAvailability: 'FULL_TIME',
      newExtraHoursEnabled: false,
      operations: {
        approveCommitmentChangeRequest: {
          callable: approveCommitmentChangeRequestCallable,
          messages: []
        },
        rejectCommitmentChangeRequest: {
          callable: rejectCommitmentChangeRequestCallable,
          messages: []
        }
      }
    } as CommitmentChangeRequest,
    ...partialJob
  }

  cy.updateStaffMocks({
    Engagement: convertToResolver<EngagementResolvers, 'Engagement'>(
      engagement
    ),
    Query: {
      node: () => jobMock(job),
      staffNode: () => ({
        ...jobMock(job),
        ...emailRecipient
      })
    },
    CommitmentChangeRequestOperations: {
      ...operationMock(
        'approveCommitmentChangeRequest',
        approveCommitmentChangeRequestCallable
      ),
      ...operationMock(
        'rejectCommitmentChangeRequest',
        rejectCommitmentChangeRequestCallable
      )
    },
    Mutation: {
      rejectCommitmentChangeRequest: successMutationMock,
      approveCommitmentChangeRequest: successMutationMock
    }
  })
}

export default updateCommitmentChangeRequestMocks
