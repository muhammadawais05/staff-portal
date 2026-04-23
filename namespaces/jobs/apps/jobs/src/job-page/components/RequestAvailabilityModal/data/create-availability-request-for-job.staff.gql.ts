import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

export const CREATE_AVAILABILITY_REQUEST_FOR_JOB = gql`
  mutation createAvailabilityRequestForJob(
    $input: CreateAvailabilityRequestForJobInput!
  ) {
    createAvailabilityRequestForJob(input: $input) {
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`
