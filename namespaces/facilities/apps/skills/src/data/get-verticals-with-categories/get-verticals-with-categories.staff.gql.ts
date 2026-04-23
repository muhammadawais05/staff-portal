import { gql, useQuery } from '@staff-portal/data-layer-service'

import { GetVerticalsWithCategoriesDocument } from './get-verticals-with-categories.staff.gql.types'

export default gql`
  query GetVerticalsWithCategories {
    verticals {
      nodes {
        ...VerticalWithSkillCategoriesFragment
      }
    }
  }

  fragment VerticalWithSkillCategoriesFragment on Vertical {
    id
    talentType
    skillCategories {
      nodes {
        id
        title
      }
    }
  }
`

export const useGetVerticalsWithCategories = () => {
  const { data, error, loading } = useQuery(
    GetVerticalsWithCategoriesDocument,
    {
      fetchPolicy: 'cache-first'
    }
  )

  const verticalsWithCategories = data?.verticals.nodes

  return {
    verticalsWithCategories,
    loading,
    error
  }
}
