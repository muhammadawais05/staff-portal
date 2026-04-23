import {
  gql,
  useQuery,
  filterUnauthorizedErrors,
  isNetworkLoading
} from '@staff-portal/data-layer-service'

import { GetCandidateEmploymentsDocument } from './get-candidate-profile.staff.gql.types'

export default gql`
  query GetCandidateEmployments($talentId: ID!) {
    node(id: $talentId) {
      ... on Talent {
        id
        type
        profile {
          employments {
            nodes {
              ...CandidateEmploymentFragment
            }
          }
          portfolioItems {
            nodes {
              ...CandidatePortfolioFragment
            }
          }
        }
      }
    }
  }

  fragment CandidateEmploymentFragment on TalentEmployment {
    id
    company
    startYear
    endYear
    experienceItems
    position
    skills {
      nodes {
        name
      }
    }
  }

  fragment CandidatePortfolioFragment on TalentPortfolioItem {
    id
    title
    link
    position
    description
    skills {
      nodes {
        name
      }
    }
  }
`

export const useGetCandidateProfile = ({
  talentId,
  skip
}: {
  talentId: string
  skip?: boolean
}) => {
  const { data, loading, networkStatus, ...restOptions } = useQuery(
    GetCandidateEmploymentsDocument,
    {
      fetchPolicy: 'cache-first',
      variables: {
        talentId
      },
      throwOnError: true,
      errorFilters: [filterUnauthorizedErrors],
      skip
    }
  )

  return {
    data: data?.node,
    loading,
    networkLoading: isNetworkLoading({ data, loading, networkStatus }),
    ...restOptions
  }
}
