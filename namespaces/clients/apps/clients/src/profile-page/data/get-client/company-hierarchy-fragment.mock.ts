import { ClientHierarchyFragment } from './get-client.staff.gql.types'

export const companyHierarchyFragmentMock: ClientHierarchyFragment = {
  children: {
    nodes: [
      {
        fullName: 'Company Name',
        id: '123'
      }
    ],
    totalCount: 1
  },
  parent: {
    fullName: 'Company Name',
    id: '123'
  }
}
