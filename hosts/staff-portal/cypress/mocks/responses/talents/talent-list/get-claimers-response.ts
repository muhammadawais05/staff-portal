import { encodeEntityId } from '@staff-portal/data-layer-service'

export const getClaimersResponse = () => ({
  data: {
    roles: {
      nodes: [
        {
          id: encodeEntityId('123', 'Staff'),
          fullName: 'Abilio Esteves',
          __typename: 'Staff'
        }
      ],
      __typename: 'StaffConnection'
    }
  }
})
