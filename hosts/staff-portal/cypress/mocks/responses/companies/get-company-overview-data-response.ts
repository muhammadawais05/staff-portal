import { encodeEntityId } from '@staff-portal/data-layer-service'
import {
  Client,
  ClientCumulativeStatus,
  OfacStatus
} from '@staff-portal/graphql/staff'

import {
  getClientOperations,
  getCompanyRepresentativeOperations
} from '~integration/mocks/fragments'
import { parentLinkMock } from '~integration/mocks'

export const getCompanyOverviewDataResponse = (client?: Partial<Client>) => ({
  data: {
    node: {
      id: encodeEntityId('123', 'Client'),
      parent: parentLinkMock(),
      operations: getClientOperations(),
      enterpriseAccountStatus: {
        status: 'ACTIVE',
        __typename: 'ClientEnterpriseAccountStatus'
      },
      fullName: 'DuBuque, Cruickshank and Volkman',
      businessType: 'ENTERPRISE_BUSINESS',
      email: 'dhar-ed0c9b2ff6f3b805@toptal.io',
      enterpriseLeadStatus: null,
      enterpriseFollowUpStatus: null,
      enterpriseFollowUpStatusComment: null,
      website: 'http://dubuque.cruickshank.and.volkman1461028.com',
      billingPhone: ' 608.242.4100 ext. 32120',
      salesPlaybookName: null,
      actualSignDate: '2019-06-21',
      salesforceLink: {
        text: '0014A00002Py3IBQAZ',
        url: 'https://toptal--staging.my.salesforce.com/lightning/r/Account/0014A00002Py3IBQAZ/view',
        __typename: 'Link'
      },
      companyHqPhone: null,
      clientopedia: null,
      billingOptionsUpdateEnabled: false,
      onboardingPath: null,
      accountPlan: null,
      photo: null,
      currentNegotiation: null,
      webResource: {
        url: 'https://staging.toptal.net/platform/staff/companies/1544845',
        text: 'DuBuque, Cruickshank and Volkman',
        __typename: 'Link'
      },
      timeZone: {
        name: '(UTC-06:00) America - Chicago',
        value: 'America/Chicago',
        __typename: 'TimeZone'
      },
      leadPotential: {
        leadProbabilityBucket: 'MEDIUM',
        __typename: 'ClientLeadPotential'
      },
      scoreExplanation: {
        negativeFeatures: null,
        positiveFeatures: null,
        __typename: 'ScoreExplanation'
      },
      country: {
        id: 'VjEtQ291bnRyeS0yMzQ',
        name: 'United States',
        __typename: 'Country'
      },
      city: 'Madison',
      contact: {
        id: 'VjEtQ29tcGFueVJlcHJlc2VudGF0aXZlLTE1NDQ4NDQ',
        webResource: {
          text: "Ruben D'Amore",
          url: 'https://staging.toptal.net/platform/staff/company_representatives/1544844',
          __typename: 'Link'
        },
        __typename: 'CompanyRepresentative',
        fullName: "Ruben D'Amore",
        email: 'dhar-ed0c9b2ff6f3b805@toptal.io',
        contacts: {
          nodes: [
            {
              id: 'VjEtQ29udGFjdC0yMjM3MzI5',
              type: 'EMAIL',
              value: 'dhar-ed0c9b2ff6f3b805@toptal.io',
              __typename: 'Contact'
            }
          ],
          __typename: 'ContactConnection'
        },
        orderedPhoneNumbers: {
          nodes: [
            {
              id: 'VjEtQ29udGFjdC0yNzI2NDQx',
              type: 'PHONE',
              value: '+16082424100#32106',
              note: 'TEST_NOTE_0',
              primary: true,
              phoneCategory: 'OTHER',
              __typename: 'Contact'
            }
          ],
          totalCount: 1,
          __typename: 'ContactConnection'
        },
        operations: getCompanyRepresentativeOperations()
      },
      hierarchyCategory: 'Top Level Company',
      legalName: 'DuBuque, Cruickshank and Volkman',
      activeStaContract: null,
      status: 'active',
      ofacStatus: OfacStatus.NORMAL,
      visualComplianceStatus: 'NOT_FULLY_CHECKED',
      countAsLead: false,
      discountEligible: false,
      fullTimeDiscount: '0',
      partTimeDiscount: '0',
      leadSource: 'INBOUND',
      signerEmail: 'dhar-ed0c9b2ff6f3b805@toptal.io',
      signerFullName: "Ruben D'Amore",
      tier: 'TIER_1',
      primaryRegion: {
        id: 'VjEtUmVnaW9uLTc',
        name: 'South Central',
        __typename: 'Region'
      },
      secondaryRegion: {
        id: 'VjEtUmVnaW9uLTc',
        name: 'South Central',
        __typename: 'Region'
      },
      likelihoodToClose: null,
      cumulativeStatus: ClientCumulativeStatus.PENDING_TOS,
      investigations: {
        nodes: [],
        __typename: 'ClientInvestigationConnection'
      },
      ...client,
      __typename: 'Client'
    }
  }
})
