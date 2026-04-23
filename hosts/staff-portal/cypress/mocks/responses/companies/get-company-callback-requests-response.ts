import { Client } from '@staff-portal/graphql/staff'

export const getCompanyCallbackRequestsResponse = (
  client?: Partial<Client>
) => ({
  data: {
    node: {
      id: 'VjEtQ2xpZW50LTMzNzkzOQ',
      callbackRequests: {
        nodes: [],
        __typename: 'CallbackRequestDefaultConnection'
      },
      ...client,
      __typename: 'Client'
    }
  }
})
