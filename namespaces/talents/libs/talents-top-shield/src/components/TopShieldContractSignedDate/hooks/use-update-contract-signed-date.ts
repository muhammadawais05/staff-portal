import { useNotifications } from '@toptal/picasso/utils'
import { useMutation } from '@staff-portal/data-layer-service'
import { UpdateTopShieldApplicationContractSignedDateInput } from '@staff-portal/graphql/staff'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'

import { UpdateTopShieldApplicationContractSignedDateDocument } from '../data/update-top-shield-application-contract-signed-date'

const ERROR_MESSAGE = 'Unable to update contract signed date.'

export const useUpdateContractSignedDate = (topShieldApplicationId: string) => {
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()

  const [updateContractSignedDate, { loading: updateLoading }] = useMutation(
    UpdateTopShieldApplicationContractSignedDateDocument,
    {
      onError: () => showError(ERROR_MESSAGE)
    }
  )

  const handleChange = async (
    key: 'contractSignedDate',
    values: Partial<UpdateTopShieldApplicationContractSignedDateInput>
  ) => {
    const { data } = await updateContractSignedDate({
      variables: {
        input: {
          topShieldApplicationId,
          contractSignedDate: values.contractSignedDate
        }
      }
    })

    return handleMutationResult({
      mutationResult: data?.updateTopShieldApplicationContractSignedDate
    })
  }

  return { handleChange, loading: updateLoading }
}
