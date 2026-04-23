import { Client } from '@staff-portal/graphql/staff'

export const successOperationMock = (client?: {}) => ({
  client: {
    id: 'VjEtQ2xpZW50LTUyODg4NQ',
    ...client
  } as unknown as Client,
  success: true,
  errors: []
})
