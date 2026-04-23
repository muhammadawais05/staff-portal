import { encodeEntityId } from '@staff-portal/data-layer-service'

export const getSourcersResponse = () => ({
  data: {
    roles: {
      nodes: [
        {
          id: encodeEntityId('123', 'Staff'),
          fullName: 'Aliona Miron',
          __typename: 'Staff'
        }
      ],
      __typename: 'StaffConnection'
    }
  }
})
