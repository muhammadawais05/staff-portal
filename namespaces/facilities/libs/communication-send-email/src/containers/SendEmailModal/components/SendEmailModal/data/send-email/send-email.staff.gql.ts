import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import {
  SendEmailDocument,
  SendEmailMutation,
  SendEmailMutationVariables
} from './send-email.staff.gql.types'

export const SEND_EMAIL: typeof SendEmailDocument = gql`
  mutation SendEmail($input: SendEmailToInput!) {
    sendEmailTo(input: $input) {
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useSendEmail = ({
  onCompleted,
  onError
}: {
  onCompleted?: (data: SendEmailMutation) => void
  onError: () => void
}) => {
  const [sendEmail, { loading }] = useMutation(SEND_EMAIL, {
    onCompleted,
    onError
  })

  return {
    sendEmail: (input: SendEmailMutationVariables['input']) =>
      sendEmail({ variables: { input } }),
    loading
  }
}
