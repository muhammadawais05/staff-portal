import { encodeEntityId } from '@staff-portal/data-layer-service'
import { Client, ReviewStatus } from '@staff-portal/graphql/staff'

import { hiddenOperationMock } from '~integration/mocks'

export const getSystemInformationResponse = (client?: Partial<Client>) => ({
  data: {
    node: {
      id: encodeEntityId('123', 'Client'),
      reviewStatus: ReviewStatus.NONE,
      reviewLink: null,
      lastAnsweredPromotion: null,
      interestedIn: 'Developers',
      updatedAt: '2021-12-02T11:41:45-03:00',
      representatives: {
        nodes: [
          {
            id: 'VjEtQ29tcGFueVJlcHJlc2VudGF0aXZlLTIwNjQ0MTM',
            currentSignInAt: null,
            currentSignInIp: null,
            ipLocationV2: null,
            __typename: 'CompanyRepresentative'
          }
        ],
        totalCount: 1,
        __typename: 'ClientRepresentativesConnection'
      },
      mobileAppEnabled: true,
      howDidYouHear: null,
      howDidYouHearDetails: null,
      tosAcceptedAt: null,
      applicationInfo: null,
      referrer: {
        id: 'VjEtU3RhZmYtMTE0OTkyOQ',
        fullName: 'Drew Ritter',
        __typename: 'Staff',
        webResource: {
          text: 'Drew Ritter',
          url: 'https://staging.toptal.net/platform/staff/staff/1149929',
          __typename: 'Link'
        }
      },
      createdAt: '2019-03-21T14:26:27-03:00',
      claimedAt: '2019-08-21T06:36:30-03:00',
      approvedAt: '2019-08-21T06:36:30-03:00',
      billingVerifiedAt: '2020-06-09T19:31:59-03:00',
      hiresCount: 5,
      claimableSince: '2019-08-21T06:36:30-03:00',
      promotions: {
        webResource: {
          text: 'Promotions',
          url: 'https://staging.toptal.net/platform/staff/companies/1544845/promotions',
          __typename: 'Link'
        },
        __typename: 'PromotionsConnection'
      },
      operations: {
        patchClientProfile: hiddenOperationMock(),
        __typename: 'ClientOperations'
      },
      ...client,
      __typename: 'Client'
    }
  }
})
