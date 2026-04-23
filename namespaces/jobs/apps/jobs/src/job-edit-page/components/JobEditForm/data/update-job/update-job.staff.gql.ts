import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { UpdateJobDocument } from './update-job.staff.gql.types'

export default gql`
  mutation UpdateJob($input: UpdateJobInput!) {
    updateJob(input: $input) {
      ...MutationResultFragment
    }
  }
  ${MUTATION_RESULT_FRAGMENT}
`

export const useUpdateJob = ({
  onError
}: {
  onError?: (error: Error) => void
}) =>
  useMutation(UpdateJobDocument, {
    onError
  })
