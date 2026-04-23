import React, { useMemo } from 'react'
import { Link } from '@staff-portal/navigation'
import { Button, Link as PicassoLink } from '@toptal/picasso'

import getCancelStepUrl from '../../utils/get-cancel-step-url'
import { useCandidateSendingContext } from '../../hooks'

export type Props = {
  disabled: boolean
}

const CancelStepButton = ({ disabled }: Props) => {
  const { jobId, talentId } = useCandidateSendingContext()

  const cancelStepUrl = useMemo(
    () =>
      getCancelStepUrl({
        jobId,
        talentId
      }),
    [jobId, talentId]
  )

  return (
    <Button
      data-testid='cancel-step-button'
      as={Link as typeof PicassoLink}
      href={cancelStepUrl}
      disabled={disabled}
      variant='secondary'
    >
      Cancel
    </Button>
  )
}

export default CancelStepButton
