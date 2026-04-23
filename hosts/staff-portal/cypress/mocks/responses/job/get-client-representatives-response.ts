import { encodeEntityId } from '@staff-portal/data-layer-service'

export const getClientRepresentativesResponse = () => ({
  data: {
    node: {
      id: encodeEntityId('123', 'Client'),
      representatives: {
        nodes: [
          {
            id: encodeEntityId('123', 'CompanyRepresentative'),
            fullName: 'John Doe',
            phoneNumber: '+0000010101',
            __typename: 'CompanyRepresentative'
          }
        ],
        __typename: 'ClientRepresentativesConnection'
      },
      __typename: 'Client'
    }
  }
})
