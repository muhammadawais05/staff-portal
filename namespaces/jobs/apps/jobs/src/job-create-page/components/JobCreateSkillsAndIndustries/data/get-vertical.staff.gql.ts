import { useGetNode, gql } from '@staff-portal/data-layer-service'

import { GetVerticalDocument } from './get-vertical.staff.gql.types'

export default gql`
  query GetVertical($id: ID!) {
    node(id: $id) {
      ... on Vertical {
        id
        skillCategories {
          nodes {
            ...VerticalSkillCategoryFragment
          }
        }
        defaultSkillCategory {
          ...VerticalSkillCategoryFragment
        }
      }
    }
  }

  fragment VerticalSkillCategoryFragment on SkillCategory {
    id
    description
    position
    title
  }
`

export const useGetVertical = (id: string) =>
  useGetNode(GetVerticalDocument)({ id }, { fetchPolicy: 'cache-first' })
