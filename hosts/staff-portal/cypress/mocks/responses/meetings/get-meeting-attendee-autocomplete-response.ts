export const getMeetingAttendeeAutocompleteResponse = () => ({
  data: {
    autocomplete: {
      edges: [
        {
          key: '1',
          label: 'Mante-Ward KK',
          labelHighlight: '{{strong}}Ma{{/strong}}nte-Ward KK',
          node: {
            id: 'VjEtQ2xpZW50LTU5OTI4NA',
            __typename: 'Client'
          },
          nodeTypes: ['top_level_company'],
          photo: null,
          __typename: 'AutocompleteEdge'
        }
      ],
      __typename: 'AutocompleteConnection'
    }
  }
})
