import { encodeEntityId } from '@staff-portal/data-layer-service'
import { Client } from '@staff-portal/graphql/staff'

import { hiddenOperationMock } from '~integration/mocks'

export const getInDepthCompanyResearchResponse = (
  client?: Partial<Client>
) => ({
  data: {
    node: {
      id: encodeEntityId('123', 'Client'),
      foundingYear: '1927',
      industry: 'Financial Services',
      revenueRange: 'Greater than $5B',
      annualRevenue: '10604',
      careerPages: {
        nodes: [],
        totalCount: 0,
        __typename: 'CareerPageConnection'
      },
      employeeCountEstimation: '15801',
      currentEmployeeCount: 15801,
      secondaryIndustry: null,
      businessModels: ['B2B', 'B2C'],
      giorgioEmployeeRange: null,
      internalEmployeeCount: null,
      clientopedia: null,
      buyingSignalsService: {
        currentEmployeeCount: 15801,
        foundingYear: '1927',
        industry: 'Finance',
        revenueRange: 'Greater than $5B',
        stage: null,
        totalFunding: null,
        acquiredBy: [],
        acquiredCompanies: ['homesite'],
        linkedin: {
          text: '4647',
          url: 'https://linkedin.com/company/4647',
          __typename: 'Link'
        },
        twitter: {
          text: '@amfam',
          url: 'https://twitter.com/amfam',
          __typename: 'Link'
        },
        facebook: {
          text: 'amfam',
          url: 'https://facebook.com/amfam',
          __typename: 'Link'
        },
        crunchbase: null,
        __typename: 'BuyingSignalsService'
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
