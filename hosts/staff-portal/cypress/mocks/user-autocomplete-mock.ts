import { AutocompleteConnection } from '@staff-portal/graphql/staff'

const userAutocompleteMock = (): AutocompleteConnection => ({
  edges: [
    {
      label: 'Francesca Connelly',
      labelHighlight: null,
      nodeTypes: ['company_representative'],
      nodeTypeTitles: ['Company representative'],
      photo: null,
      key: 'key',
      node: {
        id: 'VjEtQ29tcGFueVJlcHJlc2VudGF0aXZlLTkyMjMxMQ'
      },
      entityType: 'company_representative'
    }
  ],
  nodes: [],
  totalCount: 1
})

export default userAutocompleteMock
