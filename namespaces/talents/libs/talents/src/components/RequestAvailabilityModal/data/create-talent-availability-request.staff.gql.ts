import { CreateTalentAvailabilityRequestInput } from '@staff-portal/graphql/staff'
import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { CreateTalentAvailabilityRequestDocument } from './create-talent-availability-request.staff.gql.types'
import { JOB_CANDIDATE_OPERATIONS_FRAGMENT } from '../../../data/job-candidate-operations-fragment'

export const CREATE_TALENT_AVAILABILITY_REQUEST: typeof CreateTalentAvailabilityRequestDocument = gql`
  mutation CreateTalentAvailabilityRequest(
    $input: CreateTalentAvailabilityRequestInput!
    $jobId: ID!
  ) {
    createTalentAvailabilityRequest(input: $input) {
      ...MutationResultFragment
      talent {
        id
        operations {
          ...JobCandidateOperationsFragment
        }
      }
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
  ${JOB_CANDIDATE_OPERATIONS_FRAGMENT}
`

export const useCreateTalentAvailabilityRequest = ({
  onError,
  onCompleted
}: {
  onError: (error: Error) => void
  onCompleted?: () => void
}) => {
  const [requestAvailability, { loading }] = useMutation(
    CREATE_TALENT_AVAILABILITY_REQUEST,
    {
      onError,
      onCompleted
    }
  )

  return {
    requestAvailability: (input: CreateTalentAvailabilityRequestInput) =>
      requestAvailability({
        variables: {
          input,
          jobId: input.jobId
        }
      }),
    loading
  }
}
