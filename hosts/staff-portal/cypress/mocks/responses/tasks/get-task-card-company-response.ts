import { Client, Contact } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import { enabledOperationMock } from '~integration/mocks/enabled-operation-mock'
import { timeZoneMock } from '~integration/mocks/fragments'

type Props = {
  company?: Partial<Client>
  companyContacts?: Partial<Contact[]>
}

export const getTaskCardCompanyResponse = ({
  company,
  companyContacts
}: Props = {}) => ({
  data: {
    node: {
      id: 'VjEtQ2xpZW50LTUxMzk0Mg',
      fullName: 'Stracke, Walsh and McGlynn',
      businessType: null,
      claimableSince: '2021-04-10T18:31:40+03:00',
      createdAt: '2021-04-10T18:30:30+03:00',
      cumulativeStatus: 'BAD_LEAD',
      daysInFunnel: 278,
      email: 'ddes-79613bec29ef42f2@toptal.io',
      interestedIn: 'Developers',
      reviewStatus: 'NONE',
      twitter: null,
      website: null,
      applicationInfo: {
        id: encodeEntityId('123', 'ApplicationInfo'),
        webResource: {
          text: '123',
          url: 'some-url'
        },
        __typename: 'ApplicationInfo'
      },
      claimer: {
        id: 'VjEtU3RhZmYtMjgzMDI0OA',
        webResource: {
          text: 'Andy Torp',
          url: 'https://staging.toptal.net/platform/staff/staff/2830248',
          __typename: 'Link'
        },
        __typename: 'Staff',
        fullName: 'Andy Torp'
      },
      contact: {
        id: encodeEntityId('123', 'CompanyRepresentative'),
        webResource: {
          text: 'Yoko Hermiston',
          url: 'https://staging.toptal.net/platform/staff/company_representatives/2438258',
          __typename: 'Link'
        },
        __typename: 'CompanyRepresentative',
        fullName: 'Yoko Hermiston',
        contacts: {
          nodes: companyContacts || [
            {
              id: 'VjEtQ29udGFjdC0yODA1ODUw',
              type: 'EMAIL',
              value: 'ddes-79613bec29ef42f2@toptal.io',
              __typename: 'Contact'
            }
          ],
          __typename: 'ContactConnection'
        },
        invitedToLoginAt: null,
        operations: {
          inviteToLoginCompanyRepresentative: enabledOperationMock(),
          __typename: 'CompanyRepresentativeOperations'
        }
      },
      country: {
        id: 'VjEtQ291bnRyeS0yMzQ',
        name: 'United States',
        __typename: 'Country'
      },
      city: null,
      leadPotential: {
        leadProbabilityBucket: 'HIGH',
        __typename: 'ClientLeadPotential'
      },
      scoreExplanation: {
        negativeFeatures: null,
        positiveFeatures: null,
        __typename: 'ScoreExplanation'
      },
      photo: null,
      referrer: null,
      reviewAttempts: {
        totalCount: 0,
        __typename: 'ReviewAttemptConnection'
      },
      timeZone: timeZoneMock(),
      engagements: {
        totalCount: 0,
        __typename: 'ClientEngagementConnection'
      },
      billingVerifiedAt: null,
      updateProfileUrl:
        'https://staging.toptal.net/platform/clients/update_profile?client_id=513942',
      companyLegacyId: 2438257,
      lastAnsweredPromotion: null,
      promotions: {
        webResource: {
          url: 'https://staging.toptal.net/platform/staff/companies/2438257/promotions',
          __typename: 'Link'
        },
        __typename: 'PromotionsConnection'
      },
      __typename: 'Client',
      flags: {
        nodes: [],
        __typename: 'RoleFlagConnection'
      },
      totalJobs: {
        totalCount: 0,
        __typename: 'ClientJobConnection'
      },
      activeJobs: {
        totalCount: 0,
        __typename: 'ClientJobConnection'
      },
      jobsForVerticalsEngaged: {
        verticalsEngaged: [],
        __typename: 'ClientJobConnection'
      },
      representatives: {
        nodes: [],
        __typename: 'ClientRepresentativesConnection'
      },
      investigations: {
        nodes: [],
        __typename: 'ClientInvestigationConnection'
      },
      operations: {
        blackFlagClient: enabledOperationMock(),
        markClientAsBadLead: enabledOperationMock(),
        pauseClient: enabledOperationMock(),
        repauseClient: enabledOperationMock(),
        resumeClient: enabledOperationMock(),
        updateProfileClient: enabledOperationMock(),
        rejectClient: enabledOperationMock(),
        __typename: 'ClientOperations'
      },
      invoices: {
        totalAmount: '0',
        __typename: 'ClientInvoiceConnection'
      },
      overdueInvoices: {
        totalCount: 0,
        __typename: 'ClientInvoiceConnection'
      },
      webResource: {
        url: 'https://staging.toptal.net/platform/staff/companies/2438257',
        text: 'Stracke, Walsh and McGlynn',
        __typename: 'Link'
      },
      ...company
    }
  }
})
