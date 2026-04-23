import { MockedResponse } from '@staff-portal/data-layer-service'

import { GET_CLIENT_CONTACT } from './get-client-contact.staff.gql'

export const createClientContactMock = (clientId: string): MockedResponse => {
  return {
    request: {
      query: GET_CLIENT_CONTACT,
      variables: { clientId }
    },
    result: {
      data: {
        __typename: 'Query',
        node: {
          __typename: 'Client',
          id: 'VjEtQ29udGFjdC0xNDA2Mjg',
          contact: {
            id: 'VjEtQ29tcGFueVJlcHJlc2VudGF0aXZlLTkyMjA4NA',
            __typename: 'CompanyRepresentative',
            contacts: {
              __typename: 'ContactConnection',
              nodes: [
                {
                  __typename: 'Contact',
                  id: 'VjEtQ29udGFjdC0xNDA2Mjg',
                  type: 'PHONE',
                  value: '+14157541480',
                  category: null,
                  note: null,
                  primary: false,
                  external: false
                },
                {
                  __typename: 'Contact',
                  id: 'VjEtQ29udGFjdC0xMTg0ODM2',
                  type: 'EMAIL',
                  value: 'chri-85c99b84ad414e3f@toptal.io',
                  category: null,
                  note: null,
                  primary: false,
                  external: false
                },
                {
                  __typename: 'Contact',
                  id: 'VjEtQ29udGFjdC1za3lwZSNwdXJhX3NjaHVsaXN0NTM4',
                  type: 'SKYPE',
                  value: 'pura_schulist538',
                  category: null,
                  note: null,
                  primary: false,
                  external: false
                }
              ]
            }
          }
        }
      }
    }
  }
}
