import { encodeEntityId } from '@staff-portal/data-layer-service'

export const getVerticalSkillsAutcompleteResponse = () => ({
  data: {
    node: {
      id: encodeEntityId('123', 'Vertical'),
      coreSkills: {
        nodes: [
          {
            id: encodeEntityId('123', 'SkillName'),
            skills: {
              nodes: [
                {
                  id: encodeEntityId('456', 'Skill'),
                  name: 'JavaScript',
                  competentProfilesCount: 2601,
                  expertProfilesCount: 4696,
                  strongProfilesCount: 3124,
                  totalProfilesCount: 10421,
                  category: {
                    id: encodeEntityId('123', 'SkillCategory'),
                    title: 'Languages',
                    position: 6,
                    __typename: 'SkillCategory'
                  },
                  __typename: 'Skill'
                }
              ],
              __typename: 'SkillConnection'
            },
            __typename: 'SkillName'
          }
        ],
        __typename: 'SkillNameConnection'
      },
      skillsAutocomplete: {
        edges: [
          {
            key: 'skills-keywords-36981',
            label: 'TypeScript',
            labelHighlight: '{{strong}}TypeScript{{/strong}}',
            node: {
              id: encodeEntityId('123', 'Skill'),
              name: 'TypeScript',
              competentProfilesCount: 1031,
              expertProfilesCount: 1235,
              strongProfilesCount: 1319,
              totalProfilesCount: 3585,
              category: {
                id: encodeEntityId('123', 'SkillCategory'),
                title: 'Languages',
                description: 'e.g., Python, PHP, Java, C#, JavaScript, SQL',
                position: 6,
                __typename: 'SkillCategory'
              },
              __typename: 'Skill'
            },
            __typename: 'AutocompleteEdge'
          }
        ],
        __typename: 'AutocompleteConnection'
      },
      __typename: 'Vertical'
    }
  }
})
