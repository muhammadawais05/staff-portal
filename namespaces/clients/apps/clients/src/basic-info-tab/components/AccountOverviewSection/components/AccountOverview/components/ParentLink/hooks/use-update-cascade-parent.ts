import { useNotifications } from '@toptal/picasso/utils'
import type { CascadeClientParentUpdatesInput } from '@staff-portal/graphql/staff'
import { useMutation } from '@staff-portal/data-layer-service'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'

import { SetCascadeClientParentUpdatesDocument } from '../data/set-update-cascade-parent.staff.gql.types'

const useUpdateCascadeParent = (hideModal: () => void) => {
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()

  const [cascadeClientParentUpdates, { loading }] = useMutation(
    SetCascadeClientParentUpdatesDocument,
    {
      onError: showError
    }
  )

  const handleSubmit = async ({
    ...variables
  }: CascadeClientParentUpdatesInput) => {
    const { data } = await cascadeClientParentUpdates({
      variables: {
        input: {
          ...variables
        }
      }
    })

    return handleMutationResult({
      mutationResult: data?.cascadeClientParentUpdates,
      successNotificationMessage: 'Parent was successfully updated.',
      onSuccessAction: hideModal
    })
  }

  return { handleSubmit, submitting: loading }
}

export default useUpdateCascadeParent
