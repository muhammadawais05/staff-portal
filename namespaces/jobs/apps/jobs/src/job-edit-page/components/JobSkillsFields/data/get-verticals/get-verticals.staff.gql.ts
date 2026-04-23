import { useQuery, gql } from '@staff-portal/data-layer-service'

import { GetJobEditVerticalsDocument } from './get-verticals.staff.gql.types'

export default gql`
  query GetJobEditVerticals {
    verticals {
      nodes {
        ...JobEditVerticalFragment
      }
    }
  }
  fragment JobEditVerticalFragment on Vertical {
    id
    skillCategories {
      nodes {
        id
        description
        position
        title
      }
    }
    defaultSkillCategory {
      id
      description
      title
      position
    }
  }
`

export const useGetVerticals = () => {
  const { data, error, ...restOptions } = useQuery(
    GetJobEditVerticalsDocument,
    {
      throwOnError: true
    }
  )

  return {
    verticals: data?.verticals.nodes,
    error,
    ...restOptions
  }
}
