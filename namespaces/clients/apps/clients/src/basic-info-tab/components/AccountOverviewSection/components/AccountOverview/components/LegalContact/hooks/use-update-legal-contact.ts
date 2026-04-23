import type { UpdateClientLegalContactDetailsInput } from '@staff-portal/graphql/staff'
import { useMutation } from '@staff-portal/data-layer-service'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'

import { SetUpdateClientLegalContactDetailsDocument } from '../../../../../data/set-update-client-legal-contact-details.staff.gql.types'

const useUpdateLegalContact = (hideModal: () => void) => {
  const { handleMutationResult } = useHandleMutationResult()

  const [updateClientLegalContactDetails, { loading }] = useMutation(
    SetUpdateClientLegalContactDetailsDocument
  )

  const handleSubmit = async (input: UpdateClientLegalContactDetailsInput) => {
    const { data } = await updateClientLegalContactDetails({
      variables: {
        input
      }
    })

    return handleMutationResult({
      isFormSubmit: true,
      mutationResult: data?.updateClientLegalContactDetails,
      successNotificationMessage:
        'The Legal Contact Details was successfully updated.',
      onSuccessAction: hideModal
    })
  }

  return { handleSubmit, loading }
}

export default useUpdateLegalContact
