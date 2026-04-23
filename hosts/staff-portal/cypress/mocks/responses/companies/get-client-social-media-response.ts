import { encodeEntityId } from '@staff-portal/data-layer-service'
import { Client } from '@staff-portal/graphql/staff'

import { hiddenOperationMock } from '~integration/mocks'

export const getClientSocialMediaResponse = (client?: Partial<Client>) => ({
  data: {
    node: {
      id: encodeEntityId('123', 'Client'),
      linkedinLink: {
        text: '4647',
        url: 'https://linkedin.com/company/4647',
        __typename: 'Link'
      },
      facebookLink: {
        text: 'amfam',
        url: 'https://facebook.com/amfam',
        __typename: 'Link'
      },
      crunchbaseLink: null,
      zoominfoProfileUrl: null,
      twitterLink: {
        text: '@amfam',
        url: 'https://twitter.com/amfam',
        __typename: 'Link'
      },
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
      clientopedia: null,
      operations: {
        patchClientProfile: hiddenOperationMock(),
        __typename: 'ClientOperations'
      },
      ...client,
      __typename: 'Client'
    }
  }
})
