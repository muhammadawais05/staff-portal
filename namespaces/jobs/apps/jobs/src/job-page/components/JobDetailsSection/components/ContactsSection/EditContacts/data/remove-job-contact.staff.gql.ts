import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

export default gql`
  mutation RemoveJobContact($jobId: ID!, $representativeId: ID!) {
    removeJobContact(input: {
      jobId: $jobId,
      companyRepresentativeId: $representativeId
    }){
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`
