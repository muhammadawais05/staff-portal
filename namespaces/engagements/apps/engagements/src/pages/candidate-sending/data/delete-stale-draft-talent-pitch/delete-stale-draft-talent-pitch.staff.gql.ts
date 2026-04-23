import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

export default gql`
  mutation DeleteStaleDraftTalentPitch($jobId: ID!, $talentId: ID!) {
    deleteStaleDraftTalentPitch(input: { jobId: $jobId, talentId: $talentId }) {
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`
