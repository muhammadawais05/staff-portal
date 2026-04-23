import { encodeEntityId } from '@staff-portal/data-layer-service'

export const getVerticalSpecializationsResponse = () => ({
  data: {
    node: {
      id: 'VjEtVmVydGljYWwtOQ',
      specializations: {
        nodes: [
          {
            id: encodeEntityId('123', 'Specialization'),
            title: 'Core',
            __typename: 'Specialization'
          },
          {
            id: encodeEntityId('123', 'Specialization'),
            title: 'Product Owner / Business Analyst',
            __typename: 'Specialization'
          }
        ],
        __typename: 'VerticalSpecializationConnection'
      },
      __typename: 'Vertical'
    }
  }
})
