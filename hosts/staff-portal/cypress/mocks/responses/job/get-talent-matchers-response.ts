import { encodeEntityId } from '@staff-portal/data-layer-service'

export const getTalentMatchersResponse = () => ({
  data: {
    roles: {
      nodes: [
        {
          id: encodeEntityId('123', 'Staff'),
          fullName: 'Abraham Maravillas',
          teams: {
            nodes: [
              {
                id: encodeEntityId('123', 'Team'),
                name: 'Developer Matchers',
                __typename: 'Team'
              }
            ],
            __typename: 'TeamConnection'
          },
          __typename: 'Staff'
        }
      ],
      __typename: 'StaffConnection'
    }
  }
})
