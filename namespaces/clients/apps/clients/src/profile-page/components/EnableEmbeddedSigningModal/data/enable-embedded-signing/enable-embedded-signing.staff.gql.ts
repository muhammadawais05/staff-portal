import { useMutation, gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { EMBEDDED_SIGNING_FRAGMENT } from '../../../../data/embedded-signing-fragment'
import {
  EnableEmbeddedSigningDocument,
  EnableEmbeddedSigningMutation
} from './enable-embedded-signing.staff.gql.types'

const ENABLE_EMBEDDED_SIGNING: typeof EnableEmbeddedSigningDocument = gql`
  mutation EnableEmbeddedSigning($input: EnableEmbeddedSigningInput!) {
    enableEmbeddedSigning(input: $input) {
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

export const useEnableEmbeddedSigning = ({
  onError,
  onCompleted
}: {
  onError: () => void
  onCompleted?: (data: EnableEmbeddedSigningMutation) => void
}) =>
  useMutation(ENABLE_EMBEDDED_SIGNING, {
    onError,
    onCompleted
  })
