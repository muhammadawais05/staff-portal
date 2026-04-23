import { Client } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

export const getClaimClientContactsResponse = (client?: Partial<Client>) => ({
  data: {
    node: {
      ...client,
      id: encodeEntityId('123', 'Client'),
      fullName: 'Demo client auto.created.client.3046091@toptal.io',
      contact: {
        id: 'VjEtQ29tcGFueVJlcHJlc2VudGF0aXZlLTMwNDYwOTI',
        fullName: 'Contact Name',
        contacts: {
          nodes: [
            {
              id: 'VjEtQ29udGFjdC0zMzgxODA1',
              type: 'PHONE',
              value: '+16187770000',
              __typename: 'Contact'
            },
            {
              id: 'VjEtQ29udGFjdC1za3lwZSNjb21wYW55X3NreXBl',
              type: 'SKYPE',
              value: 'company_skype',
              __typename: 'Contact'
            }
          ],
          __typename: 'ContactConnection'
        },
        __typename: 'CompanyRepresentative'
      },
      __typename: 'Client'
    }
  }
})
