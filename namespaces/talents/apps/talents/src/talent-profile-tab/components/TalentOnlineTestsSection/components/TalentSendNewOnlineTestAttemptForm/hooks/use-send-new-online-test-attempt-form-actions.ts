import { useRef, useState } from 'react'

import { TalentSendNewOnlineTestAttemptFormMethods } from '../TalentSendNewOnlineTestAttemptForm'

export const useSendNewOnlineTestAttemptFormActions = () => {
  const formRef = useRef<TalentSendNewOnlineTestAttemptFormMethods>()

  const [submitting, setSubmitting] = useState(false)

  const submitForm = async () => {
    const submitResult = formRef.current?.submit()

    if (!submitResult) {
      return
    }

    setSubmitting(true)
    await submitResult
    setSubmitting(false)

    return submitResult
  }

  return {
    submitForm,
    formRef,
    submitting
  }
}
