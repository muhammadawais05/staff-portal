export const getAssociationUsersAutocompleteResponse = () => ({
  data: {
    autocomplete: {
      edges: [
        {
          key: 'users-1834154',
          label: 'Martin Rau',
          labelHighlight: '{{strong}}Elv{{/strong}}a Rau',
          node: {
            id: 'VjEtQ29tcGFueVJlcHJlc2VudGF0aXZlLTE5MjEwMjE',
            webResource: {
              url: 'https://demo-link',
              __typename: 'Link'
            },
            __typename: 'CompanyRepresentative'
          },
          photo: null,
          nodeTypes: ['company_representative'],
          __typename: 'AutocompleteEdge'
        }
      ],
      totalCount: 1,
      __typename: 'AutocompleteConnection'
    }
  }
})
