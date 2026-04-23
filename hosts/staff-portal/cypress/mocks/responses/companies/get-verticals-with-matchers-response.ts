import { encodeEntityId } from '@staff-portal/data-layer-service'
import { Staff } from '@staff-portal/graphql/staff'

export const getVerticalsWithMatchersResponse = (
  staff: Partial<Staff> = {}
) => ({
  data: {
    verticals: {
      nodes: [
        {
          id: 'VjEtVmVydGljYWwtMg',
          name: 'Designer',
          talentType: 'designer',
          clientMatchers: {
            nodes: [
              {
                id: encodeEntityId('001', 'Staff'),
                fullName: 'Jonathon Sauer',
                __typename: 'Staff',
                ...staff
              }
            ],
            __typename: 'StaffConnection'
          },
          __typename: 'Vertical'
        }
      ],
      __typename: 'VerticalConnection'
    }
  }
})
