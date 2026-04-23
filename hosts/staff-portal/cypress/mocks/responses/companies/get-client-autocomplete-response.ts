export const getCompanyAutocompleteResponse = () => ({
  data: {
    autocomplete: {
      edges: [
        {
          key: '1',
          label: 'Rowe-Frami XH',
          labelHighlight: '',
          nodeTypes: ['top_level_company'],
          entityType: 'company',
          photo: null,
          node: {
            id: 'VjEtQ2xpZW50LTMzODEyNg',
            companyLegacyId: 1545219,
            __typename: 'Client'
          },
          __typename: 'AutocompleteEdge'
        }
      ],
      __typename: 'AutocompleteConnection'
    }
  }
})
