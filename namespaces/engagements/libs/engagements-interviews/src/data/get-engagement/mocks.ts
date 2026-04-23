import {
  EngagementStatus,
  Maybe,
  OperationCallableTypes
} from '@staff-portal/graphql/staff'
import { createOperationMock } from '@staff-portal/operations/src/mocks'
import { createEngagementOperationsFragmentMock } from '@staff-portal/engagements/src/mocks'

import { EngagementFragment } from './get-engagement.staff.gql.types'

type Props = {
  engagement?: Partial<EngagementFragment>
  engagementStatus?: EngagementStatus
  talentWebResourceUrl?: Maybe<string>
  jobTalentCount?: number
}

export const createEngagementFragmentFragmentMock = ({
  engagement,
  engagementStatus = EngagementStatus.ACTIVE,
  talentWebResourceUrl,
  jobTalentCount = 2
}: Props = {}): EngagementFragment => ({
  id: '1',
  status: engagementStatus,
  nextTopNumber: 123,
  interview: {
    id: '2',
    operations: {
      updateInterviewGoogleCalendarEvent: {
        callable: OperationCallableTypes.ENABLED,
        messages: []
      },
      scheduleSingleCommitInterview: {
        callable: OperationCallableTypes.ENABLED,
        messages: []
      },
      proposeInterviewTimeSlots: {
        callable: OperationCallableTypes.ENABLED,
        messages: []
      }
    }
  },
  talent: {
    id: '3',
    type: 'some type',
    fullName: 'Talent Full Name',
    resumeUrl: 'https://public-profile-page.com',
    webResource: {
      text: 'Web Res Text',
      url: talentWebResourceUrl
    },
    slackContacts: {
      nodes: [
        {
          id: 'some-id',
          webResource: {
            url: 'someslackurl'
          }
        }
      ]
    }
  },
  client: {
    id: 'client-id',
    contracts: {
      totalCount: 123
    },
    webResource: {
      text: 'Web Res Text Client',
      url: 'some.url'
    }
  },
  job: {
    id: 'some-id',
    talentCount: jobTalentCount,
    webResource: {
      text: 'Web Res Text Job',
      url: 'some.url'
    }
  },
  clientEmailMessaging: {
    id: 'some-id',
    operations: {
      sendEmailTo: {
        callable: OperationCallableTypes.ENABLED,
        messages: []
      }
    }
  },
  talentEmailMessaging: {
    id: 'some-id',
    operations: {
      sendEmailTo: {
        callable: OperationCallableTypes.ENABLED,
        messages: []
      }
    }
  },
  operations: {
    ...createEngagementOperationsFragmentMock()
  },
  latestExternalInterview: {
    nodes: []
  },
  newExternalInterview: {
    id: '1',
    operations: {
      proposeInterviewTimeSlots: createOperationMock(),
      scheduleSingleCommitInterview: createOperationMock(),
      clearAndRescheduleSingleCommitInterview: createOperationMock(),
      clearAndChangeInterviewProposedTimeSlots: createOperationMock()
    }
  },
  latestInternalInterview: {
    nodes: []
  },
  newInternalInterview: {
    id: '1',
    operations: {
      scheduleInternalSingleCommitInterview: createOperationMock(),
      proposeInternalInterviewTimeSlots: createOperationMock(),
      clearAndRescheduleInternalSingleCommitInterview: createOperationMock(),
      clearAndChangeInternalInterviewProposedTimeSlots: createOperationMock()
    }
  },
  ...engagement
})
