import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { GET_OFAC_STATUS_DATA } from '../../../../data/get-ofac-status-data'
import {
  UpdateClientOfacStatusDocument,
  UpdateClientOfacStatusMutation
} from './update-client-ofac-status.staff.gql.types'

export const UPDATE_CLIENT_OFAC_STATUS: typeof UpdateClientOfacStatusDocument = gql`
  mutation UpdateClientOfacStatus($input: UpdateClientOfacStatusInput!) {
    updateClientOfacStatus(input: $input) {
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useUpdateClientOfacStatus = ({
  id,
  onError,
  onCompleted
}: {
  id: string
  onError: (error: Error) => void
  onCompleted?: (data: UpdateClientOfacStatusMutation) => void
}) =>
  useMutation(UPDATE_CLIENT_OFAC_STATUS, {
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
