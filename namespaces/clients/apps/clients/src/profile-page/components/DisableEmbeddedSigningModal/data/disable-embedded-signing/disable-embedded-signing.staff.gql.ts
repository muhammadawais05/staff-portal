import { useMutation, gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { EMBEDDED_SIGNING_FRAGMENT } from '../../../../data/embedded-signing-fragment'
import {
  DisableEmbeddedSigningDocument,
  DisableEmbeddedSigningMutation
} from './disable-embedded-signing.staff.gql.types'

const DISABLE_EMBEDDED_SIGNING: typeof DisableEmbeddedSigningDocument = gql`
  mutation DisableEmbeddedSigning($input: DisableEmbeddedSigningInput!) {
    disableEmbeddedSigning(input: $input) {
      client {
        id
        ...EmbeddedSigningFragment
      }
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
  ${EMBEDDED_SIGNING_FRAGMENT}
`

export const useDisableEmbeddedSigning = ({
  onError,
  onCompleted
}: {
  onError: () => void
  onCompleted?: (data: DisableEmbeddedSigningMutation) => void
}) =>
  useMutation(DISABLE_EMBEDDED_SIGNING, {
    onError,
    onCompleted
  })
