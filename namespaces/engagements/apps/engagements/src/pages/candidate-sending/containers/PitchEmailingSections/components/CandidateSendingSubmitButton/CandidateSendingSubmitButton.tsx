import { EngagementStatus } from '@staff-portal/graphql/staff'
import { Button } from '@toptal/picasso'
import { useForm, useFormState } from '@toptal/picasso-forms'
import { VariantType } from '@toptal/picasso/Button'
import React, { useEffect, useState, PropsWithChildren } from 'react'

interface Props {
  status?: EngagementStatus
  variant?: VariantType
  'data-testid'?: string
  onClick: () => void
}

const CandidateSendingSubmitButton = ({
  status,
  variant,
  children,
  'data-testid': dataTestId = 'candidate-sending-submit-button',
  onClick
}: PropsWithChildren<Props>) => {
  const { change } = useForm()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { submitting: isFormSubmitting } = useFormState({
    subscription: { submitting: true }
  })

  useEffect(() => {
    if (!isFormSubmitting) {
      setIsSubmitting(false)
    }
  }, [isFormSubmitting])

  const changeStatus = () => {
    change('status', status)
  }

  const handleClick = () => {
    setIsSubmitting(true)
    changeStatus()
    onClick()
  }

  return (
    <Button
      variant={variant}
      disabled={isFormSubmitting}
      loading={isSubmitting && isFormSubmitting}
      onClick={handleClick}
      data-testid={dataTestId}
    >
      {children}
    </Button>
  )
}

export default CandidateSendingSubmitButton
