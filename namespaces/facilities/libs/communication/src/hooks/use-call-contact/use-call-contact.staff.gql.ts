import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import {
  CallContactDocument,
  CallContactMutation
} from './use-call-contact.staff.gql.types'

export const CALL_CONTACT: typeof CallContactDocument = gql`
  mutation CallContact($input: CallContactInput!) {
    callContact(input: $input) {
      ...MutationResultFragment
      externalCallUrl
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useCallContact = ({
  onError,
  onCompleted
}: {
  onError: () => void
  onCompleted?: (data: CallContactMutation) => void
}) =>
  useMutation(CALL_CONTACT, {
    onError,
    onCompleted
  })
