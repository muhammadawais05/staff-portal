import { useState } from 'react'
import { useNotifications } from '@toptal/picasso/utils'
import { ImportStaInput } from '@staff-portal/graphql/staff'
import { useMutation } from '@staff-portal/data-layer-service'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { CONTRACTS_UPDATED } from '@staff-portal/clients'

import { ImportStaDocument } from '../data'

export const NO_EFFECTIVE_DATE_CODE = 'noEffectiveDateFound'

export const useImportSTA = (hideModal: () => void) => {
  const [contractEffectiveDateEnabled, setContractEffectiveDateEnabled] =
    useState(false)
  const { showError } = useNotifications()
  const emitMessage = useMessageEmitter()
  const { handleMutationResult } = useHandleMutationResult()
  const [importSta, { loading }] = useMutation(ImportStaDocument, {
    onError: () => {
      showError('An error occurred, the Company STA was not imported.')
    }
  })

  const handleSubmit = async (input: ImportStaInput) => {
    const { data } = await importSta({
      variables: {
        input
      }
    })

    if (
      data?.importSTA?.errors?.some(
        message => message.code === NO_EFFECTIVE_DATE_CODE
      )
    ) {
      setContractEffectiveDateEnabled(true)
    }

    return handleMutationResult({
      mutationResult: data?.importSTA,
      successNotificationMessage: 'The Company STA was successfully imported.',
      onSuccessAction: () => {
        emitMessage(CONTRACTS_UPDATED, { clientId: input.clientId })
        hideModal()
      },
      isFormSubmit: true
    })
  }

  return { contractEffectiveDateEnabled, handleSubmit, loading }
}
