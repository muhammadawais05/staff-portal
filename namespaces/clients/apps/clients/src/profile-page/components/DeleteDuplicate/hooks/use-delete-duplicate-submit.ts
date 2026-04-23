import { DeleteDuplicateClientInput } from '@staff-portal/graphql/staff'
import { useMutation } from '@staff-portal/data-layer-service'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'

import { DeleteDuplicateDocument } from '../data/delete-duplicate/delete-duplicate.staff.gql.types'

const useDeleteDuplicateSubmit = ({
  hideModal,
  companyId
}: {
  hideModal: () => void
  companyId: string
}) => {
  const [deleteDuplicate, { loading }] = useMutation(DeleteDuplicateDocument)
  const { handleMutationResult } = useHandleMutationResult()

  const handleSubmit = async (
    input: Omit<DeleteDuplicateClientInput, 'clientId'>
  ) => {
    const { data, errors } = await deleteDuplicate({
      variables: {
        input: {
          clientId: companyId,
          ...input
        }
      }
    })

    return handleMutationResult({
      mutationResult: data?.deleteDuplicateClient,
      successNotificationMessage: 'The company was successfully deleted.',
      onSuccessAction: hideModal,
      isFormSubmit: true,
      rootLevelErrors: errors
    })
  }

  return { handleSubmit, loading }
}

export default useDeleteDuplicateSubmit
