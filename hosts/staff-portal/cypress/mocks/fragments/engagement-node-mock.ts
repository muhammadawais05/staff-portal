import {
  EngagementCommitmentEnum,
  BillCycle,
  CommitmentRateAvailability,
  CommitmentAvailability,
  Engagement,
  EngagementStatus,
  FeedbackOperations
} from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import {
  emailMessagingEngagementTalentMock,
  engagementOperationsMock,
  feedbackMock,
  feedbackOperationsMock,
  webResourceMock
} from '.'
import { clientNodeMock } from './client-node-mock'
import { EngagementOperationType } from './engagement-operations-mock'
import { interviewMock, Props as InterviewMockProps } from './interview-mock'
import { jobNodeMock } from './job-node-mock'
import { talentNodeMock } from './talent-node-mock'
import { FeedbackMockProps } from './feedback-mock'
import { enabledOperationMock } from '../enabled-operation-mock'

export const engagementNodeMock = ({
  node = {},
  clientNode = {},
  feedbackNodes = [],
  jobNode = {},
  talentNode = {},
  interviewNode = {},
  engagementOperation,
  feedbackOperation
}: {
  node?: {}
  clientNode?: {}
  feedbackNodes?: Partial<FeedbackMockProps['feedback']>[]
  jobNode?: {}
  talentNode?: {}
  interviewNode?: InterviewMockProps
  engagementOperation?: EngagementOperationType
  feedbackOperation?: Partial<FeedbackOperations>
} = {}) => ({
  node: (): Engagement =>
    ({
      __typename: 'Engagement',
      id: encodeEntityId('123', 'Engagement'),
      trialLength: 5,
      createdAt: '2021-07-19T16:27:05+03:00',

      feedbacks: {
        nodes: () =>
          feedbackNodes.map(feedbackNode =>
            feedbackMock({
              ...feedbackNode,
              operations: feedbackOperationsMock(feedbackOperation)
            })
          )
      },
      job: {
        ...jobNodeMock(jobNode).node()
      },
      client: {
        ...clientNodeMock(clientNode).node()
      },
      talent: {
        ...talentNodeMock(talentNode).node()
      },
      interview: {
        node: () => ({
          ...interviewMock(interviewNode)
        })
      },
      engagementBreaks: {
        nodes: [],
        totalCount: 0
      },
      commitment: EngagementCommitmentEnum.HOURLY,
      discountMultiplier: '1',
      currentCommitment: {
        availability: CommitmentAvailability.full_time,
        adjustedCompanyRate: {
          availability: CommitmentRateAvailability.WEEK,
          value: '10.00'
        },
        adjustedRevenueRate: {
          availability: CommitmentRateAvailability.HOUR,
          value: '10.00'
        },
        adjustedTalentRate: {
          availability: CommitmentRateAvailability.WEEK,
          value: '10.00'
        },
        canBeDiscounted: false
      },
      billCycle: BillCycle.MONTHLY,
      billingCycles: {
        nodes: []
      },
      extraHoursEnabled: false,
      canBeDiscounted: false,
      semiMonthlyPaymentTalentAgreement: false,
      clientEmailMessaging: {
        id: 'some-id',
        operations: {
          sendEmailTo: enabledOperationMock()
        }
      },
      talentEmailMessaging: emailMessagingEngagementTalentMock(),
      interviews: {
        totalCount: 0,
        nodes: []
      },
      newExternalInterview: {
        id: '1',
        operations: {
          proposeInterviewTimeSlots: enabledOperationMock(),
          scheduleSingleCommitInterview: enabledOperationMock(),
          clearAndChangeInterviewProposedTimeSlots: enabledOperationMock()
        }
      },
      newInternalInterview: {
        id: '1',
        operations: {
          proposeInternalInterviewTimeSlots: enabledOperationMock(),
          clearAndChangeInternalInterviewProposedTimeSlots:
            enabledOperationMock()
        }
      },
      operations: {
        ...engagementOperationsMock(engagementOperation)
      },
      ...webResourceMock({
        text: 'Test Engagement'
      }),
      status: EngagementStatus.PENDING,
      ...node
    } as unknown as Engagement)
})
