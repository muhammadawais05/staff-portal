import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { CreateEmailTemplateDocument } from './create-email-template.staff.gql.types'

export default gql`
  mutation CreateEmailTemplate($input: CreateEmailTemplateInput!) {
    createEmailTemplate(input: $input) {
      ...MutationResultFragment
    }
  }
  ${MUTATION_RESULT_FRAGMENT}
`

export const useCreateEmailTemplate = ({
  onError
}: {
  onError?: (error: Error) => void
}) => useMutation(CreateEmailTemplateDocument, { onError })
