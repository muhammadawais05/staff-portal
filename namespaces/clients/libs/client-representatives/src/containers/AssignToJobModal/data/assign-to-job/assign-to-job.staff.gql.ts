import { gql } from '@staff-portal/data-layer-service'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { REPRESENTATIVE_JOB_FRAGMENT } from '../../../../data/representative-job-fragment/representative-job-fragment.staff.gql'

export default gql`
  mutation AssignCompanyRepresentativeToJob(
    $input: AssignCompanyRepresentativeToJobInput!
  ) {
    assignCompanyRepresentativeToJob(input: $input) {
      companyRepresentative {
        id
        jobs(filter: { current: true }) {
          nodes {
            ...RepresentativeJob
          }
        }
        operations {
          assignCompanyRepresentativeToJob {
            ...OperationFragment
          }
        }
      }
      ...MutationResultFragment
    }
  }
  ${REPRESENTATIVE_JOB_FRAGMENT}
  ${OPERATION_FRAGMENT}
  ${MUTATION_RESULT_FRAGMENT}
`
