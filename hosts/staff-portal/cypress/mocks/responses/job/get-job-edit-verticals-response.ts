import { encodeEntityId } from '@staff-portal/data-layer-service'
import { Vertical } from '@staff-portal/graphql/staff'

export const getJobEditVerticalsResponse = (verticals?: Vertical[]) => ({
  data: {
    verticals: {
      nodes: verticals ?? [
        {
          id: encodeEntityId('123', 'Vertical'),
          skillCategories: {
            nodes: [
              {
                id: encodeEntityId('123', 'SkillCategory'),
                description: "Skills that don't fit into other categories",
                position: 9,
                title: 'Other',
                __typename: 'SkillCategory'
              }
            ],
            __typename: 'SkillCategoryConnection'
          },
          defaultSkillCategory: {
            id: encodeEntityId('123', 'SkillCategory'),
            description: "Skills that don't fit into other categories",
            title: 'Other',
            position: 9,
            __typename: 'SkillCategory'
          },
          specializations: {
            nodes: [
              {
                id: encodeEntityId('123', 'Specialization'),
                title: 'Frontend',
                __typename: 'Specialization'
              }
            ],
            __typename: 'VerticalSpecializationConnection'
          },
          __typename: 'Vertical'
        }
      ],
      __typename: 'VerticalConnection'
    }
  }
})
