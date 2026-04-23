import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { UpdateEmailTemplateDocument } from './update-email-template.staff.gql.types'

export default gql`
  mutation UpdateEmailTemplate($input: UpdateEmailTemplateInput!) {
    updateEmailTemplate(input: $input) {
      ...MutationResultFragment
    }
  }
  ${MUTATION_RESULT_FRAGMENT}
`

export const useUpdateEmailTemplate = ({
  onError
}: {
  onError?: (error: Error) => void
}) => useMutation(UpdateEmailTemplateDocument, { onError })
