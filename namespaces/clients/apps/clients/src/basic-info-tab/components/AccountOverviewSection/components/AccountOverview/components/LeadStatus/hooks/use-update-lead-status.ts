import { UpdateClientEnterpriseLeadStatusInput } from '@staff-portal/graphql/staff'
import { useMutation } from '@staff-portal/data-layer-service'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'

import {
  SetUpdateClientEnterpriseLeadStatusDocument,
  SetUpdateClientEnterpriseLeadStatusMutation
} from '../../../../../data/set-update-client-enterprise-lead-status.staff.gql.types'

const useUpdateLeadStatus = (
  onSuccessAction: (
    mutationResult: SetUpdateClientEnterpriseLeadStatusMutation['updateClientEnterpriseLeadStatus']
  ) => void
) => {
  const { handleMutationResult } = useHandleMutationResult()

  const [updateClientEnterpriseLeadStatus, { loading }] = useMutation(
    SetUpdateClientEnterpriseLeadStatusDocument
  )

  const handleSubmit = async ({
    ...variables
  }: UpdateClientEnterpriseLeadStatusInput) => {
    const { data } = await updateClientEnterpriseLeadStatus({
      variables: {
        input: {
          ...variables
        }
      }
    })

    return handleMutationResult({
      mutationResult: data?.updateClientEnterpriseLeadStatus,
      successNotificationMessage: 'The Lead Status was successfully updated.',
      onSuccessAction
    })
  }

  return { handleSubmit, loading }
}

export default useUpdateLeadStatus
