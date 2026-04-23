import { encodeEntityId } from '@staff-portal/data-layer-service'

export const getAddActivityModalClientDataResponse = () => ({
  data: {
    node: {
      id: encodeEntityId('123', 'Client'),
      contact: {
        id: encodeEntityId('123', 'CompanyRepresentative'),
        webResource: {
          text: 'Tamela Heathcote',
          url: 'https://staging.toptal.net/platform/staff/company_representatives/123',
          __typename: 'Link'
        },
        __typename: 'CompanyRepresentative',
        fullName: 'Tamela Heathcote'
      },
      representatives: {
        nodes: [
          {
            id: encodeEntityId('123', 'CompanyRepresentative'),
            webResource: {
              text: 'Tamela Heathcote',
              url: 'https://staging.toptal.net/platform/staff/company_representatives/123',
              __typename: 'Link'
            },
            __typename: 'CompanyRepresentative',
            fullName: 'Tamela Heathcote',
            currentSignInAt: '2022-01-26T09:13:58+03:00'
          }
        ],
        __typename: 'ClientRepresentativesConnection'
      },
      __typename: 'Client'
    }
  }
})
