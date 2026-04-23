import { Talent } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

export const getPossibleSourcersResponse = (talent?: Partial<Talent>) => ({
  data: {
    node: {
      id: encodeEntityId('123', 'Talent'),
      sourcers: {
        nodes: [
          {
            id: encodeEntityId('123', 'Staff'),
            fullName: 'Aliona Miron',
            __typename: 'Staff'
          }
        ],
        __typename: 'StaffConnection'
      },
      ...talent,
      __typename: 'Talent'
    }
  }
})
