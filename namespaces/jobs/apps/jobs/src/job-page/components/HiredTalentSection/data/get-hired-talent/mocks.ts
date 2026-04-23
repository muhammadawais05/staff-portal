import {
  EngagementStatus,
  EngagementTooltipStatus,
  InterviewCumulativeStatus,
  Maybe,
  OperationCallableTypes
} from '@staff-portal/graphql/staff'
import { createEngagementCommonActionsOperationsMock } from '@staff-portal/engagements/src/mocks'

import { HiredTalentEngagementFragment } from './get-hired-talent.staff.gql.types'

type Props = {
  engagement?: Partial<HiredTalentEngagementFragment>
  engagementWebResourceUrl?: Maybe<string>
  engagementStatus?: EngagementStatus
  talentWebResourceUrl?: Maybe<string>
  jobTalentCount?: number
}

export const createHiredTalentEngagementFragmentMock = ({
  engagement,
  engagementWebResourceUrl,
  engagementStatus = EngagementStatus.ACTIVE,
  talentWebResourceUrl,
  jobTalentCount = 2
}: Props = {}): HiredTalentEngagementFragment =>
  ({
    id: '1',
    status: engagementStatus,
    cumulativeStatus: 'Cumulative Status',
    tooltipStatus: EngagementTooltipStatus.TIMEZONE,
    nextTopNumber: 123,
    interview: {
      id: '2',
      cumulativeStatus: InterviewCumulativeStatus.ACCEPTED
    },
    timeZone: {
      name: 'Time Zone Name',
      value: 'Time Zone Value'
    },
    talent: {
      id: '3',
      type: 'some type',
      fullName: 'Talent Full Name',
      webResource: {
        text: 'Web Res Text',
        url: talentWebResourceUrl
      },
      slackContacts: {
        nodes: [
          {
            id: 'someid',
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
    engagementEndedFeedbackReason: {
      id: '4',
      name: 'Ended Feedback Name'
    },
    postponedPerformedAction: {
      comment: 'Performed Action Comment'
    },
    webResource: {
      text: 'Engagement webResource Text',
      url: engagementWebResourceUrl
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
      ...createEngagementCommonActionsOperationsMock(),
      sendSemiMonthlyEngagementPaymentsAgreement: {
        callable: OperationCallableTypes.ENABLED,
        messages: []
      }
    },
    ...engagement
  } as HiredTalentEngagementFragment)
