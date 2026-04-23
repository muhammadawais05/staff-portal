export default {
  autocomplete: {
    __typename: 'AutocompleteConnection',
    edges: [
      {
        __typename: 'AutocompleteEdge',
        key: 'VjEtU3RhZmYtNzUxNTM5',
        entityType: 'company',
        label: 'Another LTD',
        labelHighlight: '{{strong}}A{{/strong}}nother LTD',
        node: {
          __typename: 'Staff',
          id: 'VjEtU3RhZmYtNzUxNTM5'
        },
        nodeTypes: ['company']
      },
      {
        __typename: 'AutocompleteEdge',
        key: 'VjEtU3RhZmYtMTg0MTYzMA==',
        entityType: 'company',
        label: 'Another Client',
        labelHighlight: '{{strong}}A{{/strong}}nother Client',
        node: {
          __typename: 'Staff',
          id: 'VjEtU3RhZmYtMTg0MTYzMA=='
        },
        nodeTypes: ['company']
      },
      {
        __typename: 'AutocompleteEdge',
        key: 'VjEtU3RhZmYtMTY4MzkxMg==',
        entityType: 'company',
        label: 'A company',
        labelHighlight: '{{strong}}A{{/strong}} company',
        node: {
          __typename: 'Staff',
          id: 'VjEtU3RhZmYtMTY4MzkxMg=='
        },
        nodeTypes: ['company']
      }
    ]
  }
}
