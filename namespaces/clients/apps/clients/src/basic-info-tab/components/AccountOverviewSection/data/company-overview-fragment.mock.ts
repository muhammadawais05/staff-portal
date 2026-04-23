/* eslint-disable max-lines */
import {
  BusinessTypes,
  ClientCumulativeStatus,
  ContactType,
  FlagColor,
  LeadProbabilityBucket,
  LeadSource,
  NegotiationStatus,
  OfacStatus,
  ReviewStatus,
  VisualComplianceStatus,
  ClientTier,
  ClientEnterpriseAccountStatusEnum
} from '@staff-portal/graphql/staff'
import { createOperationMock } from '@staff-portal/operations/src/mocks'

import { CompanyOverviewFragment } from './company-overview-fragment.staff.gql.types'

const operationMock = createOperationMock()

export const companyOverviewFragmentMock = {
  id: 'VjEtQ2xpZW50LTUzNTQyOQ',
  fullName: 'Schulist, Funk and Wolff',
  businessType: BusinessTypes.MEDIUM_BUSINESS,
  claimableSince: '2021-06-10T20:17:59+03:00',
  createdAt: '2021-06-10T20:17:58+03:00',
  cumulativeStatus: ClientCumulativeStatus.HAD_JOB,
  enterpriseLeadStatus: 'lead-status',
  enterpriseFollowUpStatus: 'follow-up-status',
  enterpriseAccountStatus: {
    status: ClientEnterpriseAccountStatusEnum.ACTIVE
  },
  enterpriseFollowUpStatusComment: 'follow-up-status-comment',
  daysInFunnel: 52,
  email: 'kala-537e316bb544285a@toptal.io',
  interestedIn: 'Developers',
  reviewStatus: ReviewStatus.NONE,
  salesPlaybookName: 'High Priority (assigned by New Classifier)',
  actualSignDate: '2021-10-15',
  salesforceLink: {
    url: 'https://toptal--staging.my.salesforce.com/lightning/r/Account/0014A00002knCOIQA2/view',
    text: '0014A00002knCOIQA2',
    __typename: 'Link'
  },
  twitter: null,
  website: 'http://schulist.funk.and.wolff2506335.com',
  accountPlan: 'https://staging.toptal.net/platform/staff/staff/2330676',
  onboardingPath: 'Headstart (Client posted first job)',
  applicationInfo: null,
  billingOptionsUpdateEnabled: true,
  hierarchyCategory: 'Top Level Company',
  likelihoodToClose: 20,
  currentNegotiation: {
    id: '123',
    status: NegotiationStatus.WAITING_ON_CLIENT,
    rounds: 60,
    negotiationDays: 365
  },
  countAsLead: true,
  discountEligible: true,
  fullTimeDiscount: '0',
  partTimeDiscount: '0',
  parent: {
    id: 'VjEtQ2xpZW50LTUzNTQyOQ',
    fullName: 'Schulist, Funk and Wolff',
    webResource: {
      url: 'https://staging.toptal.net/platform/staff/companies/2596580',
      text: 'Schulist, Funk and Wolff',
      __typename: 'Link'
    },
    contracts: {
      nodes: []
    }
  },
  clientopedia: {
    phone: '787 966 71515'
  },
  claimer: {
    id: 'VjEtU3RhZmYtMjMzMDY3Ng',
    webResource: {
      text: 'Astrid Bahringer',
      url: 'https://staging.toptal.net/platform/staff/staff/2330676',
      __typename: 'Link'
    },
    __typename: 'Staff',
    fullName: 'Astrid Bahringer'
  },
  contact: {
    id: 'VjEtQ29tcGFueVJlcHJlc2VudGF0aXZlLTI1OTY1Nzk',
    email: 'kala-537e316bb544285a@toptal.io',
    webResource: {
      text: 'Oda Wyman',
      url: 'https://staging.toptal.net/platform/staff/company_representatives/2596579',
      __typename: 'Link'
    },
    __typename: 'CompanyRepresentative',
    orderedPhoneNumbers: {
      nodes: [],
      totalCount: 0
    },
    fullName: 'Oda Wyman',
    contacts: {
      nodes: [
        {
          id: 'VjEtQ29udGFjdC0yOTU1Mzc1',
          type: ContactType.EMAIL,
          value: 'kala-537e316bb544285a@toptal.io',
          primary: true,
          __typename: 'Contact'
        },
        {
          id: 'VjEtQ29udGFjdC0yOTU1Mzc0',
          type: ContactType.PHONE,
          value: '+17879661123',
          primary: false,
          __typename: 'Contact'
        },
        {
          id: 'VjEtQ29udGFjdC0yOTU1Mzc2',
          type: ContactType.SKYPE,
          value: 'skype_id',
          primary: false,
          __typename: 'Contact'
        }
      ],
      __typename: 'ContactConnection'
    },
    invitedToLoginAt: null,
    operations: {
      inviteToLoginCompanyRepresentative: operationMock,
      updateCompanyRepresentativePhoneNumbers: operationMock,
      __typename: 'CompanyRepresentativeOperations'
    }
  },
  city: 'San Juan',
  country: {
    id: 'VjEtQ291bnRyeS0xNzg',
    name: 'Puerto Rico',
    __typename: 'Country'
  },

  leadPotential: {
    leadProbabilityBucket: LeadProbabilityBucket.MEDIUM,
    __typename: 'ClientLeadPotential'
  },
  scoreExplanation: {
    negativeFeatures: [
      {
        name: 'email_type',
        position: 1,
        value: 'gmail',
        __typename: 'ScoreFeature'
      }
    ],
    positiveFeatures: [
      {
        name: 'ready_to_start',
        position: 5,
        value: 'immediately',
        __typename: 'ScoreFeature'
      }
    ],
    __typename: 'ScoreExplanation'
  },

  photo: {
    small: 'test'
  },
  referrer: {
    id: 'VjEtQ2xpZW50LTM0MDA0OQ',
    webResource: {
      text: 'Cormier, Turner and Reilly',
      url: 'https://staging.toptal.net/platform/staff/companies/1551241',
      __typename: 'Link'
    },
    __typename: 'Client',
    fullName: 'Cormier, Turner and Reilly'
  },
  reviewAttempts: {
    totalCount: 0,
    __typename: 'ReviewAttemptConnection'
  },
  timeZone: {
    name: '(UTC-04:00) America - Puerto Rico',
    value: 'America/Puerto_Rico',
    __typename: 'TimeZone'
  },
  engagements: {
    totalCount: 1,
    __typename: 'ClientEngagementConnection'
  },
  billingVerifiedAt: '2021-06-14T19:11:44+03:00',
  billingPhone: '+17879661123',
  companyHqPhone: '787 966 71515',
  updateProfileUrl:
    'https://staging.toptal.net/platform/companies/update_profile?role_id=2596580',
  lastAnsweredPromotion: {
    score: 5,
    updatedAt: '2021-07-22T11:03:52+03:00',
    __typename: 'Promotion'
  },
  promotions: {
    webResource: {
      url: 'https://staging.toptal.net/platform/staff/companies/2596580/promotions',
      __typename: 'Link'
    },
    __typename: 'PromotionsConnection'
  },
  __typename: 'Client',
  totalJobs: {
    totalCount: 2,
    __typename: 'ClientJobConnection'
  },
  activeJobs: {
    totalCount: 0,
    __typename: 'ClientJobConnection'
  },
  jobsForVerticalsEngaged: {
    verticalsEngaged: ['developer'],
    __typename: 'ClientJobConnection'
  },
  representatives: {
    nodes: [
      {
        id: 'VjEtQ29tcGFueVJlcHJlc2VudGF0aXZlLTI1OTY1Nzk',
        webResource: {
          text: 'Oda Wyman',
          url: 'https://staging.toptal.net/platform/staff/company_representatives/2596579',
          __typename: 'Link'
        },
        __typename: 'CompanyRepresentative',
        fullName: 'Oda Wyman',
        currentSignInAt: '2021-07-08T23:46:17+03:00',
        currentSignInIp: '24.157.23.228',
        ipLocation: {
          cityName: 'Guaynabo',
          countryName: 'Puerto Rico',
          __typename: 'Location'
        }
      }
    ],
    __typename: 'ClientRepresentativesConnection'
  },
  investigations: {
    nodes: [],
    __typename: 'ClientInvestigationConnection'
  },
  invoices: {
    totalAmount: '2612.0',
    __typename: 'ClientInvoiceConnection'
  },
  overdueInvoices: {
    totalCount: 0,
    __typename: 'ClientInvoiceConnection'
  },
  webResource: {
    url: 'https://staging.toptal.net/platform/staff/companies/2596580',
    text: 'Schulist, Funk and Wolff',
    __typename: 'Link'
  },
  primaryRegion: {
    id: 'VjEtUmVnaW9uLTg',
    name: 'Southeast',
    __typename: 'Region'
  },
  tier: ClientTier.TIER_1,
  secondaryRegion: {
    id: 'VjEtUmVnaW9uLTI',
    name: 'California',
    __typename: 'Region'
  },
  operations: {
    patchClientProfile: operationMock,
    updateClientBusinessType: operationMock,
    updateClientLeadSource: operationMock,
    updateClientLegalName: operationMock,
    removeClientParent: operationMock,
    updateClientParent: operationMock,
    cascadeClientParentUpdates: operationMock,
    updateClientLegalContactDetails: operationMock,
    updateClientPrimaryRegion: operationMock,
    updateClientSecondaryRegion: operationMock,
    updateClientLikelihoodToClose: operationMock,
    addClientRoleFlag: operationMock,
    updateClientEnterpriseLeadStatus: operationMock,
    pushClientToSalesforce: operationMock,
    updateActualSignDate: operationMock,
    updateClientCountAsLead: operationMock,
    updateClientDiscountEligible: operationMock,
    restoreClientEnterpriseAccountStatus: operationMock,
    updateClientEnterpriseAccountStatus: operationMock,
    deleteDuplicateClient: operationMock,
    __typename: 'ClientOperations'
  },
  signerEmail: 'kala-537e316bb544285a@toptal.io',
  signerFullName: 'Oda Wyman',
  status: 'active',
  ofacStatus: OfacStatus.NORMAL,
  visualComplianceStatus: VisualComplianceStatus.FULLY_CHECKED,
  leadSource: LeadSource.PARTNER,
  roleFlags: {
    nodes: [
      {
        id: 'VjEtUm9sZUZsYWctNjY4NjY5',
        comment: 'This part was obfuscated, some content was here.',
        flaggedBy: {
          id: 'VjEtU3RhZmYtMzY3ODc3',
          fullName: 'Redmon Rufino',
          __typename: 'Staff'
        },
        createdAt: '2021-07-14T04:55:27+03:00',
        updatedAt: '2021-07-14T04:55:27+03:00',
        flag: {
          id: 'VjEtRmxhZy0xMjEyODY',
          color: FlagColor.ORANGE,
          title: 'Medium LTV',
          __typename: 'Flag'
        },
        operations: {
          removeRoleFlag: operationMock,
          updateRoleFlag: operationMock,
          __typename: 'RoleFlagOperations'
        },
        __typename: 'RoleFlag'
      }
    ],
    __typename: 'RoleFlagConnection'
  }
} as CompanyOverviewFragment
