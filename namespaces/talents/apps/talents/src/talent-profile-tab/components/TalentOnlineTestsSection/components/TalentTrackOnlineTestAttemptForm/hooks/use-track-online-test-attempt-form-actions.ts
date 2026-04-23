import { useRef, useState } from 'react'

import { TalentTrackOnlineTestAttemptFormMethods } from '../TalentTrackOnlineTestAttemptForm'

export const useTrackOnlineTestAttemptFormActions = () => {
  const formRef = useRef<TalentTrackOnlineTestAttemptFormMethods>()

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
