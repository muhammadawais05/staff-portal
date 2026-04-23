import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

export default gql`
  mutation CreateJobContact($jobId: ID!, $representativeId: ID!) {
    createJobContactFromJob(input: {
      jobId: $jobId
      companyRepresentativeId: $representativeId
    }){
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`
