import { useState } from 'react'
import { useModal } from '@staff-portal/modals-service'

import { RestoreFromBadLeadPromptModal } from '..'

const useRestoreFromBadLeadPrompt = (clientName?: string) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [submitHandler, setSubmitHandler] = useState<
    (onCompleted: () => void) => void
  >(() => {})
  const { showModal } = useModal(RestoreFromBadLeadPromptModal, {
    loading,
    onSubmit: submitHandler,
    clientName
  })

  return {
    showModal: (callback: Function) => {
      const handleSubmitCallback = () => async (onCompleted: () => void) => {
        setLoading(true)
        await callback(null)
        setLoading(false)

        onCompleted()
      }

      setSubmitHandler(handleSubmitCallback)
      showModal()
    }
  }
}

export default useRestoreFromBadLeadPrompt
