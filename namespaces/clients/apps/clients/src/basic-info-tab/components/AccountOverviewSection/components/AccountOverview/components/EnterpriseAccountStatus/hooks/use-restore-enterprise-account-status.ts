import type { RestoreClientEnterpriseAccountStatusInput } from '@staff-portal/graphql/staff'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'

import { useSetRestoreClientEnterpriseAccountStatus } from './use-set-restore-enterprise-account-status'

const useRestoreEnterpriseStatus = (hideModal: () => void) => {
  const { handleMutationResult } = useHandleMutationResult()

  const [updateClientEnterpriseAccountStatus, { loading }] =
    useSetRestoreClientEnterpriseAccountStatus()

  const handleSubmit = async ({
    ...variables
  }: RestoreClientEnterpriseAccountStatusInput) => {
    const { data } = await updateClientEnterpriseAccountStatus({
      variables: {
        input: {
          ...variables
        }
      }
    })

    return handleMutationResult({
      mutationResult: data?.restoreClientEnterpriseAccountStatus,
      successNotificationMessage:
        'The Enterprise Account status was successfully restored.',
      onSuccessAction: hideModal
    })
  }

  return { handleSubmit, loading }
}

export default useRestoreEnterpriseStatus
