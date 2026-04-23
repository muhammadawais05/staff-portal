import { gql, useQuery } from '@staff-portal/data-layer-service'

import { GetTalentEmploymentsSectionDocument } from './get-talent-employments-section.staff.gql.types'

export default gql`
  query GetTalentEmploymentsSection($talentId: ID!) {
    node(id: $talentId) {
      ... on Talent {
        id
        vertical {
          id
          talentType
        }
        profile: profileV2 {
          id
          employments {
            nodes {
              ...EmploymentsFragment
            }
          }
        }
      }
    }
  }

  fragment EmploymentsFragment on Employment {
    company
    startDate
    endDate
    experienceItems
    position
    skills {
      nodes {
        id
        name
      }
    }
  }
`

export const useGetTalentEmploymentsSection = ({
  talentId,
  onError
}: {
  talentId: string
  onError: () => void
}) => {
  const { data, loading, error } = useQuery(
    GetTalentEmploymentsSectionDocument,
    {
      onError,
      variables: { talentId }
    }
  )

  return {
    data: data?.node?.profile?.employments.nodes,
    talentType: data?.node?.vertical?.talentType,
    loading: loading && !data,
    error
  }
}
