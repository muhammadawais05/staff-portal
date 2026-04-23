import { gql } from '@staff-portal/data-layer-service'

const GET_CAREER_PAGE_FRAGMENT = gql`
  fragment CareerPageFragment on CareerPage {
    id
    primary
    url
    __typename
  }
`

export const GET_CAREER_PAGES_FRAGMENT = gql`
  fragment CareerPagesFragment on CareerPageConnection {
    nodes {
      ...CareerPageFragment
    }
    totalCount
  }

  ${GET_CAREER_PAGE_FRAGMENT}
`
