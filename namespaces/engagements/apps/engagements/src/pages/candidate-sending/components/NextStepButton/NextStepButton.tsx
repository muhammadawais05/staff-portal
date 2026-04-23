import React from 'react'
import { Button } from '@toptal/picasso'

import { useCandidateSendingContext } from '../../hooks'
import { CANDIDATE_SENDING_STEPS_CONFIG } from '../../config'

export type Props = {
  loading: boolean
  disabled: boolean
}

const NextStepButton = ({ disabled, loading }: Props) => {
  const { nextStep } = useCandidateSendingContext()

  if (!nextStep) {
    return null
  }

  return (
    <Button
      data-testid='next-step-button'
      variant='positive'
      type='submit'
      disabled={disabled}
      loading={loading}
    >
      Next — {CANDIDATE_SENDING_STEPS_CONFIG[nextStep].stepButtonLabel}
    </Button>
  )
}

export default NextStepButton
