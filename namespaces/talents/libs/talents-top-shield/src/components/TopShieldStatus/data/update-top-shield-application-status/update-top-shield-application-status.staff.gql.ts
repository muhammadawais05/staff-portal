import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { UpdateTopShieldApplicationStatusDocument } from './update-top-shield-application-status.staff.gql.types'

export const UPDATE_TOP_SHIELD_APPLICATION_STATUS = gql`
  mutation UpdateTopShieldApplicationStatus(
    $input: UpdateTopShieldApplicationStatusInput!
  ) {
    updateTopShieldApplicationStatus(input: $input) {
      ...MutationResultFragment
      topShieldApplication {
        id
        status
      }
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useUpdateTopShieldApplicationStatus = ({
  onError
}: {
  onError: (error: Error) => void
}) => useMutation(UpdateTopShieldApplicationStatusDocument, { onError })
