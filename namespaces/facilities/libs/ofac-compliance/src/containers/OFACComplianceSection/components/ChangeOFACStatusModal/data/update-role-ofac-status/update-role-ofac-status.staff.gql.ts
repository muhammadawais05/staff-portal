import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { GET_OFAC_STATUS_DATA } from '../../../../data/get-ofac-status-data'
import {
  UpdateRoleOfacStatusDocument,
  UpdateRoleOfacStatusMutation
} from './update-role-ofac-status.staff.gql.types'

export const UPDATE_ROLE_OFAC_STATUS: typeof UpdateRoleOfacStatusDocument = gql`
  mutation UpdateRoleOfacStatus($input: UpdateRoleOfacStatusInput!) {
    updateRoleOfacStatus(input: $input) {
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useUpdateRoleOfacStatus = ({
  id,
  onError,
  onCompleted
}: {
  id: string
  onError: (error: Error) => void
  onCompleted?: (data: UpdateRoleOfacStatusMutation) => void
}) =>
  useMutation(UPDATE_ROLE_OFAC_STATUS, {
    onError,
    onCompleted,
    refetchQueries: [
      {
        query: GET_OFAC_STATUS_DATA,
        variables: {
          id
        }
      }
    ]
  })
