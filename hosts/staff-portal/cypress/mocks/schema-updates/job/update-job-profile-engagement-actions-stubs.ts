import {
  Job,
  Engagement,
  JobStatus,
  JobCommitment,
  CommitmentAvailability,
  CommitmentRateAvailability
} from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import { enabledOperationMock } from '../../enabled-operation-mock'
import { jobPageStubs } from '../../request-stubs'
import { getEngagementOperations } from '../../fragments/get-engagement-operations'
import {
  getFeedbackReasonsResponse,
  getJobEngagementResponse
} from '~integration/mocks/responses'

const updateJobProfileEngagementActionsStubs = (job?: Partial<Job>) =>
  cy.stubGraphQLRequests({
    ...jobPageStubs({
      currentEngagement: {
        id: encodeEntityId('123', 'Engagement'),
        job: {
          id: encodeEntityId('123', 'Job'),
          talentCount: 1
        },
        commitment: JobCommitment.PART_TIME,
        status: JobStatus.ACTIVE,
        currentCommitment: {
          availability: CommitmentAvailability.hourly,
          canBeDiscounted: false,
          adjustedTalentRate: {
            availability: CommitmentRateAvailability.HOUR,
            value: '45.0'
          },
          adjustedRevenueRate: {
            availability: CommitmentRateAvailability.HOUR,
            value: '25.0'
          },
          adjustedCompanyRate: {
            availability: CommitmentRateAvailability.HOUR,
            value: '70.0'
          }
        },
        talent: {
          id: encodeEntityId('123', 'Talent'),
          talentType: 'Developer',
          __typename: 'Talent'
        },
        client: {
          id: encodeEntityId('123', 'Client'),
          enterprise: false,
          fullName: 'Mueller-Stokes WQ',
          emailMessaging: {
            id: 'VjEtRW1haWxNZXNzYWdpbmdDbGllbnQtNTMxOTg0',
            operations: {
              sendEmailTo: enabledOperationMock(),
              __typename: 'EmailMessagingOperation'
            },
            __typename: 'EmailMessagingClient'
          },
          __typename: 'Client'
        },
        talentEmailMessaging: {
          id: encodeEntityId('753', 'EmailMessagingEngagementTalent'),
          operations: {
            sendEmailTo: enabledOperationMock(),
            __typename: 'EmailMessagingOperation'
          },
          __typename: 'EmailMessagingEngagementTalent'
        },
        clientEmailMessaging: {
          id: encodeEntityId('236', 'EmailMessagingEngagementClient'),
          operations: {
            sendEmailTo: enabledOperationMock(),
            __typename: 'EmailMessagingOperation'
          },
          __typename: 'EmailMessagingEngagementClient'
        },
        operations: getEngagementOperations({
          ...job?.currentEngagement?.operations
        }),
        __typename: 'Engagement'
      } as unknown as Engagement
    }),
    GetLazyOperation: {
      data: {
        node: {
          __typename: 'Engagement',
          id: encodeEntityId('123', 'Engagement'),
          operations: {
            ...job?.currentEngagement?.operations,
            __typename: 'EngagementOperations'
          }
        }
      }
    },
    GetFeedbackReasons: getFeedbackReasonsResponse(),
    GetEngagement: getJobEngagementResponse(),
    GetRelatedTasks: {
      data: {
        staffNode: {
          id: 'VjEtSm9iLTI2NDk4NA',
          __typename: 'Job',
          relatedTasks: {
            completedCount: 11,
            nodes: [],
            __typename: 'RelatedTasksConnection'
          }
        }
      }
    },
    GetCancelledJobApplicants: {
      data: {
        node: {
          id: 'VjEtSm9iLTI2NDk4NA',
          applications: {
            nodes: [],
            __typename: 'JobApplicationConnection'
          },
          __typename: 'Job'
        }
      }
    },
    GetCreateTaskOperation: {
      data: {
        operations: {
          createTask: enabledOperationMock(),
          __typename: 'QueryOperations'
        }
      }
    }
  })

export default updateJobProfileEngagementActionsStubs
