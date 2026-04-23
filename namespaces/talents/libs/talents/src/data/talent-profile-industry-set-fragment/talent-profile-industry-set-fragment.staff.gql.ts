import { gql } from '@staff-portal/data-layer-service'

export const TALENT_PROFILE_INDUSTRY_SET_FRAGMENT = gql`
  fragment TalentProfileIndustrySetFragment on ProfileIndustrySet {
    id
    industry {
      id
      name
    }
    connections {
      nodes {
        ...ProfileItemFragment
      }
      totalCount
    }
  }

  fragment ProfileItemFragment on IndustryConnectionUnion {
    ... on Employment {
      id
      startDate
      endDate
      position
      company
      __typename
    }
    ... on PortfolioItem {
      id
      title
      __typename
    }
    ... on Profile {
      id
      __typename
    }
  }
`
