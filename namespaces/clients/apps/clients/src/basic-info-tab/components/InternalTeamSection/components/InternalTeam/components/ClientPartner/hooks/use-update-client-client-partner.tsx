import {
  UpdateClientClientPartnerInput,
  UpdateClientClientPartnerPayload
} from '@staff-portal/graphql/staff'
import { useMutation } from '@staff-portal/data-layer-service'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'

import { SetUpdateClientClientPartnerDocument } from '../../../../../data/set-update-client-partner.staff.gql.types'

const useUpdateClientClientPartner = (
  onSuccess: (data: UpdateClientClientPartnerPayload) => void,
  initialValues: UpdateClientClientPartnerInput
) => {
  const { handleMutationResult } = useHandleMutationResult()
  const [updateClientClientPartner, { loading }] = useMutation(
    SetUpdateClientClientPartnerDocument
  )

  const updateClientPartner = async (
    variables: Partial<UpdateClientClientPartnerInput> = {}
  ) => {
    const { data } = await updateClientClientPartner({
      variables: {
        input: {
          ...initialValues,
          ...variables
        }
      }
    })

    return handleMutationResult({
      mutationResult: data?.updateClientClientPartner,
      onSuccessAction: result => {
        onSuccess(result as UpdateClientClientPartnerPayload)
      }
    })
  }

  return { updateClientPartner, loading }
}

export default useUpdateClientClientPartner
