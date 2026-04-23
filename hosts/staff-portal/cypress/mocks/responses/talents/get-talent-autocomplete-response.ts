import { encodeEntityId } from '@staff-portal/data-layer-service'

export const getTalentAutocompleteResponse = () => ({
  data: {
    autocomplete: {
      edges: [
        {
          key: '1',
          label: 'Timofei Kachalov',
          labelHighlight: '',
          nodeTypes: ['developer'],
          node: {
            id: encodeEntityId('123', 'Talent'),
            __typename: 'Talent'
          },
          __typename: 'AutocompleteEdge'
        }
      ],
      __typename: 'AutocompleteConnection'
    }
  }
})
