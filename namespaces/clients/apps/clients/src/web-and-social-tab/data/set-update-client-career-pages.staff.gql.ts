import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { GET_CAREER_PAGES_FRAGMENT } from './get-career-pages-fragment.staff.gql'

export default gql`
  mutation SetUpdateClientCareerPages($input: UpdateClientCareerPagesInput!) {
    updateClientCareerPages(input: $input) {
      client {
        id
        careerPages {
          ...CareerPagesFragment
        }
      }
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
  ${GET_CAREER_PAGES_FRAGMENT}
`
