import { Talent } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

export const getTalentApplicationSkillsAutoCompleteResponse = (
  talent?: Partial<Talent>
) => ({
  data: {
    node: {
      id: encodeEntityId('123', 'Talent'),
      vertical: {
        id: 'VjEtVmVydGljYWwtMQ',
        skillsAutocomplete: {
          edges: [
            {
              key: 'skills-keywords-36920',
              labelHighlight: '{{strong}}HTML{{/strong}}',
              node: {
                name: 'HTML',
                id: 'VjEtU2tpbGwtMzY5MjA',
                __typename: 'Skill'
              },
              __typename: 'AutocompleteEdge'
            }
          ],
          __typename: 'AutocompleteConnection'
        },
        __typename: 'Vertical'
      },
      ...talent,
      __typename: 'Talent'
    }
  }
})
