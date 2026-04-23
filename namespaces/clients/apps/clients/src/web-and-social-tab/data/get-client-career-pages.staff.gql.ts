import { gql } from '@staff-portal/data-layer-service'

import { GET_CAREER_PAGES_FRAGMENT } from './get-career-pages-fragment.staff.gql'

export default gql`
  query GetClientCareerPages($clientId: ID!) {
    node(id: $clientId) {
      ... on Client {
        id
        careerPages {
          ...CareerPagesFragment
        }
      }
    }
  }

  ${GET_CAREER_PAGES_FRAGMENT}
`
