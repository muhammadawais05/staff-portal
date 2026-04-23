import { encodeEntityId } from '@staff-portal/data-layer-service'
import { Job } from '@staff-portal/graphql/staff'

export const getTalentsByNameAutocompleteResponse = (job?: Partial<Job>) => ({
  data: {
    node: {
      ...job,
      talentsAutocomplete: {
        edges: [
          {
            key: '1',
            label: 'Talent Name',
            labelHighlight: '{{strong}}Talent{{/strong}} Name',
            node: {
              id: encodeEntityId('123', 'Talent'),
              vertical: {
                id: encodeEntityId('123', 'Vertical'),
                name: 'Developer',
                __typename: 'Vertical'
              },
              __typename: 'Talent'
            },
            type: 'AutocompleteEdge'
          }
        ],
        totalCount: 1,
        __typename: 'AutocompleteConnection'
      },
      __typename: 'Job'
    }
  }
})
