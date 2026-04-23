import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { CloneEmailTemplatesDocument } from './clone-email-templates.staff.gql.types'

export default gql`
  mutation CloneEmailTemplates($input: CloneTargetRoleEmailTemplatesInput!) {
    cloneTargetRoleEmailTemplates(input: $input) {
      ...MutationResultFragment
    }

    ${MUTATION_RESULT_FRAGMENT}
  }
`

export const useCloneEmailTemplates = () =>
  useMutation(CloneEmailTemplatesDocument)
