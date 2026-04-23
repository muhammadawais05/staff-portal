import {
  ClientCumulativeStatus,
  HowDidYouHearValues,
  ReviewStatus,
  ReviewKind,
  Client
} from '@staff-portal/graphql/staff'

import { clientNodeMock, investigationsMock, webResourceMock } from '.'
import { enabledOperationMock, hiddenOperationMock } from '~integration/mocks'

export const clientInternalDataMock = (node?: Partial<Client>) => ({
  id: 'VjEtQ2xpZW50LTUyODg4NQ',
  companyLegacyId: 123,
  fullName: 'Ritchie-Jewess BU',
  gdprReportUrl:
    'https://staging.toptal.net/platform/gdpr_report?user_id=1142613',
  casesUrl: 'https://staging.toptal.net/platform/staff/roles/2596580/cases',
  emailMessagesUrl:
    'http://staging.toptal.net/companies/2596580/email_messages',
  referralsUrl: 'https://staging.toptal.net/referrals',
  updateProfileUrl:
    'https://staging.toptal.net/platform/companies/update_profile?role_id=123',
  ...systemInformationMock(),
  ...reviewAttemptsMock(),
  ...investigationsMock(),
  ...jobsForInvestigationMock(),
  ...representativesForInvestigationMock(),
  ...commentsMock(),
  ...operationsMock(),
  ...roleFlagsMock(),
  ...webResourceMock({
    text: '123',
    url: 'test-url'
  }),
  ...node
})

const systemInformationMock = (node = {}) => ({
  reviewStatus: ReviewStatus.FAILED,
  reviewLink: null,
  lastAnsweredPromotion: {
    score: 10,
    updatedAt: '2021-06-30T12:55:11+03:00'
  },
  interestedIn: 'Designers',
  updatedAt: '2021-08-05T11:06:22+03:00',
  representatives: {
    nodes: [
      {
        id: 'VjEtQ29tcGFueVJlcHJlc2VudGF0aXZlLTI1MDExNDA',
        currentSignInAt: '2021-08-06T05:59:49+03:00',
        currentSignInIp: '103.17.74.106',
        ipLocationV2: {
          cityName: 'Central',
          countryName: 'Hong Kong'
        }
      }
    ],
    totalCount: 1
  },
  mobileAppEnabled: true,
  howDidYouHear: HowDidYouHearValues.OTHER,
  howDidYouHearDetails: 'N/A',
  tosAcceptedAt: '2021-07-27T05:39:19+03:00',
  applicationInfo: null,
  referrer: null,
  createdAt: '2021-05-06T09:04:53+03:00',
  claimedAt: '2021-05-06T09:05:47+03:00',
  approvedAt: '2021-05-07T04:10:29+03:00',
  billingVerifiedAt: '2021-05-07T04:16:31+03:00',
  hiresCount: 4,
  claimableSince: '2021-05-06T09:05:35+03:00',
  promotions: {
    ...webResourceMock({
      text: 'Promotions',
      url: 'https://staging.toptal.net/platform/staff/companies/2501139/promotions'
    })
  },
  ...node
})

const reviewAttemptsMock = () => ({
  reviewAttempts: {
    nodes: [
      {
        commentary: 'Comment 1',
        createdAt: '2021-09-01T17:19:14+03:00',
        id: 'VjEtUmV2aWV3QXR0ZW1wdC02MDM5Ng',
        kind: ReviewKind.NEGATIVE,
        reviewLink: 'http://dsdsd.sd'
      },
      {
        commentary: 'Comment 2',
        createdAt: '2021-09-01T17:19:14+03:00',
        id: 'VjEtUmV2aWV3QXR0ZW1wdC02MDM3Ng',
        kind: ReviewKind.SUCCESS,
        reviewLink: 'http://dsdsd.sd'
      }
    ],
    totalCount: 2
  }
})

const commentsMock = () => ({
  commentsAccessible: true,
  cumulativeStatus: ClientCumulativeStatus.HAD_JOB
})

const jobsForInvestigationMock = () => ({
  jobs: {
    totalCount: 0,
    nodes: []
  }
})

const representativesForInvestigationMock = () => ({
  representatives: {
    totalCount: 0,
    nodes: []
  }
})

const roleFlagsMock = () => ({
  roleFlags: {
    nodes: [
      {
        id: 'VjEtUm9sZUZsYWctNTg2NzE0',
        flag: {
          id: 'VjEtRmxhZy0xMjEyODY',
          token: 'medium_ltv'
        }
      },
      {
        id: 'VjEtUm9sZUZsYWctNTU4ODk1',
        flag: {
          id: 'VjEtRmxhZy0xMjExNTI',
          token: 'seamless_matching_pitched'
        }
      }
    ]
  }
})

const operationsMock = () => ({
  operations: {
    ...clientNodeMock().node().operations,
    updateClientInvestigation: hiddenOperationMock({
      messages: ['Company is not under any investigation']
    }),
    resolveClientLegalInvestigation: hiddenOperationMock(),
    resolveClientOtherInvestigation: hiddenOperationMock(),
    resolveClientPaymentProblemInvestigation: hiddenOperationMock(),
    resolveClientClientFeedbackInvestigation: hiddenOperationMock(),
    resolveClientChallengesWithEngagementInvestigation: hiddenOperationMock(),
    resolveClientReportedIssuesInvestigation: hiddenOperationMock(),
    resolveClientCcAchDisputeInvestigation: hiddenOperationMock(),
    resolveClientAccountingErrorInvestigation: hiddenOperationMock(),
    resolveClientMatchingInvestigation: hiddenOperationMock(),
    patchClientProfile: enabledOperationMock(),
    startClientReview: enabledOperationMock(),
    resetClientReview: enabledOperationMock(),
    markClientReviewAsFailed: hiddenOperationMock({
      messages: [
        'There is no pending call to attempt feedback from this company',
        'The status review must not be "Failed" or "Exempted"'
      ]
    }),
    exemptClientFromReview: hiddenOperationMock({
      messages: [
        'There is no pending call to attempt feedback from this company',
        'The status review must not be "Failed" or "Exempted"'
      ]
    }),
    requestClientTrustPilotLink: enabledOperationMock(),
    createClientReviewAttempt: enabledOperationMock()
  }
})
