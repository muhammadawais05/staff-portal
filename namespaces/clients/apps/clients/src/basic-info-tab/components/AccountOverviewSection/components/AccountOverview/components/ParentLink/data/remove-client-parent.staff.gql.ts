import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { COMPANY_PARENT_FRAGMENT } from '../../../../../data'
import { SetRemoveClientParentDocument } from './remove-client-parent.staff.gql.types'

export const REMOVE_CLIENT_PARENT = gql`
  mutation SetRemoveClientParent($input: RemoveClientParentInput!) {
    removeClientParent(input: $input) {
      client {
        id
        ...CompanyParentFragment
      }
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
  ${COMPANY_PARENT_FRAGMENT}
`

export const useRemoveClientParentLinkMutation = () =>
  useMutation(SetRemoveClientParentDocument)
