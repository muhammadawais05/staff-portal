import {
  BusinessTypes,
  ClientCumulativeStatus,
  LeadProbabilityBucket,
  LeadSource,
  OfacStatus,
  ReviewStatus,
  VisualComplianceStatus
} from '@staff-portal/graphql/staff'

import { webResourceMock } from '.'

export const accountOverviewMock = (node = {}) => ({
  businessTypeV2: BusinessTypes.ENTERPRISE_BUSINESS,
  claimableSince: '2021-06-10T20:17:59+03:00',
  createdAt: '2021-06-10T20:17:58+03:00',
  cumulativeStatus: ClientCumulativeStatus.HAD_JOB,
  enterpriseLeadStatus: 'Budget Issues',
  enterpriseFollowUpStatus: 'follow-up-status',
  daysInFunnel: 52,
  email: 'kala-537e316bb544285a@toptal.io',
  interestedIn: 'Developers',
  reviewStatus: ReviewStatus.NONE,
  salesPlaybookName: 'High Priority (assigned by New Classifier)',
  actualSignDate: '2021-10-15',
  salesforceLink: {
    url: 'https://toptal--staging.my.salesforce.com/lightning/r/Account/0014A00002knCOIQA2/view',
    text: '0014A00002knCOIQA2'
  },
  twitter: null,
  website: 'http://schulist.funk.and.wolff2506335.com',
  accountPlan: 'https://staging.toptal.net/platform/staff/staff/2330676',
  applicationInfo: null,
  billingOptionsUpdateEnabled: true,
  hierarchyCategory: 'Top Level Company',
  likelihoodToClose: 20,
  countAsLead: true,
  discountEligible: true,
  fullTimeDiscount: '0',
  partTimeDiscount: '0',
  signerEmail: 'kala-537e316bb544285a@toptal.io',
  signerFullName: 'Oda Wyman',
  status: 'active',
  ofacStatus: OfacStatus.NORMAL,
  visualComplianceStatus: VisualComplianceStatus.FULLY_CHECKED,
  leadSource: LeadSource.PARTNER,
  leadPotential: {
    leadProbabilityBucket: LeadProbabilityBucket.MEDIUM
  },
  unresolvedPossibleDuplicates: {
    edges: []
  },
  city: undefined,
  country: {
    id: 'VjEtQ291bnRyeS0yMDc',
    name: 'Spain'
  },
  timeZone: {
    name: '(UTC-04:00) America - Puerto Rico',
    value: 'America/Puerto_Rico'
  },
  billingVerifiedAt: '2021-06-14T19:11:44+03:00',
  billingPhone: '+17879661123',
  companyHqPhone: '787 966 71515',
  updateProfileUrl:
    'https://staging.toptal.net/platform/companies/update_profile?role_id=2596580',
  companyLegacyId: 2596580,
  parent: {
    id: 'VjEtQ2xpZW50LTUzNTQyOQ',
    fullName: 'Schulist, Funk and Wolff',
    ...webResourceMock({
      url: 'https://staging.toptal.net/platform/staff/companies/2596580',
      text: 'Schulist, Funk and Wolff'
    }),
    contracts: {
      nodes: []
    }
  },
  claimer: {
    id: 'VjEtU3RhZmYtMjMzMDY3Ng',
    ...webResourceMock({
      text: 'Astrid Bahringer',
      url: 'https://staging.toptal.net/platform/staff/staff/2330676'
    }),
    fullName: 'Astrid Bahringer'
  },
  scoreExplanation: {
    negativeFeatures: [
      {
        name: 'email_type',
        position: 1,
        value: 'gmail'
      }
    ],
    positiveFeatures: [
      {
        name: 'ready_to_start',
        position: 5,
        value: 'immediately'
      }
    ]
  },
  photo: {
    thumb: 'test'
  },
  referrer: {
    id: 'VjEtQ2xpZW50LTM0MDA0OQ',
    webResource: {
      text: 'Cormier, Turner and Reilly',
      url: 'https://staging.toptal.net/platform/staff/companies/1551241'
    },
    fullName: 'Cormier, Turner and Reilly'
  },
  engagements: {
    totalCount: 1
  },
  reviewAttempts: {
    totalCount: 0
  },
  investigations: {
    nodes: []
  },
  invoices: {
    totalAmount: '2612.0'
  },
  overdueInvoices: {
    totalCount: 0
  },
  ...webResourceMock({
    url: 'https://staging.toptal.net/platform/staff/companies/2596580',
    text: 'Schulist, Funk and Wolff'
  }),
  lastAnsweredPromotion: {
    score: 5,
    updatedAt: '2021-07-22T11:03:52+03:00'
  },
  promotions: {
    ...webResourceMock({
      url: 'https://staging.toptal.net/platform/staff/companies/2596580/promotions'
    })
  },
  primaryRegion: {
    id: 'VjEtUmVnaW9uLTg',
    name: 'Southeast'
  },
  secondaryRegion: {
    id: 'VjEtUmVnaW9uLTI',
    name: 'California'
  },
  totalJobs: {
    totalCount: 2
  },
  activeJobs: {
    totalCount: 0
  },
  jobsForVerticalsEngaged: {
    verticalsEngaged: ['developer']
  },
  flags: {
    nodes: [
      {
        id: 'VjEtUm9sZUZsYWctNjY4NjY5',
        flag: {
          id: 'VjEtRmxhZy0xMjEyODY',
          title: 'Medium LTV'
        },
        comment: 'This part was obfuscated, some content was here.',
        flaggedBy: {
          id: 'VjEtU3RhZmYtMzY3ODc3',
          fullName: 'Redmon Rufino'
        },
        createdAt: '2021-07-14T04:55:27+03:00',
        updatedAt: '2021-07-14T04:55:27+03:00'
      }
    ]
  },
  callbackRequests: {
    nodes: []
  },
  type: 'Client',
  scheduleMeetingUrl: 'https://staging.toptal.net/meeting',
  scheduledMeetings: {
    nodes: []
  },
  ...node
})
