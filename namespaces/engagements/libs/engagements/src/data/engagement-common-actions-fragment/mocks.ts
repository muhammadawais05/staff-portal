import {
  EngagementStatus,
  Maybe,
  OperationCallableTypes
} from '@staff-portal/graphql/staff'

import { EngagementCommonActionsFragment } from './engagement-common-actions-fragment.staff.gql.types'
import { createEngagementOperationsFragmentMock } from '../engagement-common-actions-operations-fragment/mocks'

type Props = {
  engagement?: Partial<EngagementCommonActionsFragment>
  engagementStatus?: EngagementStatus
  talentWebResourceUrl?: Maybe<string>
  jobTalentCount?: number
}

export const createEngagementCommonActionsFragmentMock = ({
  engagement,
  engagementStatus = EngagementStatus.ACTIVE,
  talentWebResourceUrl,
  jobTalentCount = 2
}: Props = {}): EngagementCommonActionsFragment => ({
  id: '1',
  status: engagementStatus,
  nextTopNumber: 123,
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
          id: 'slack-contact-id',
          webResource: {
            url: 'some-slack-url'
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
  ...engagement
})
