import { useState } from 'react'
import { useNotifications } from '@toptal/picasso/utils'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'

import {
  GetCreateClaimerDetailsQuery,
  useCreateClientClaimer
} from '../../data'
import { useClaimCompanyNextAction } from '../use-claim-company-next-action/use-claim-company-next-action'

export const useClaimCompany = (hideModal: () => void) => {
  const [loading, setLoading] = useState(false)
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()
  const [createClientClaimer] = useCreateClientClaimer({
    onError: () =>
      showError('An error occurred, you have not claimed this client company.')
  })
  const proceedClaimCompanyNextAction = useClaimCompanyNextAction(hideModal)

  const handleSubmit = async (
    company: NonNullable<GetCreateClaimerDetailsQuery['node']>
  ) => {
    setLoading(true)

    const { id: clientId } = company
    const { data } = await createClientClaimer({
      variables: { clientId }
    })

    const validationErrors = handleMutationResult({
      mutationResult: data?.createClientClaimer,
      returnAllErrors: true,
      onSuccessAction: result =>
        proceedClaimCompanyNextAction({ result, company })
    })

    if (validationErrors) {
      hideModal()
    }
  }

  return {
    handleSubmit,
    loading
  }
}
