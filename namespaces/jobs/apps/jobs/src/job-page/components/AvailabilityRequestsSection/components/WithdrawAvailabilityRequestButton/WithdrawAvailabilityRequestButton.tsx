import { Button } from '@toptal/picasso'
import React from 'react'
import { Operation, OperationFragment } from '@staff-portal/operations'

import { useWithdrawAvailabilityRequestModal } from '../WithdrawAvailabilityRequestModal'

type Props = {
  operation: OperationFragment
  availabilityRequestId: string
}

const WithdrawAvailabilityRequestButton = ({
  operation,
  availabilityRequestId
}: Props) => {
  const { showModal } = useWithdrawAvailabilityRequestModal({
    availabilityRequestId
  })

  return (
    <Operation
      operation={operation}
      render={disabled =>
        !disabled && (
          <Button
            size='small'
            variant='negative'
            disabled={disabled}
            onClick={showModal}
            data-testid='JobAvailabilityRequest-withdraw-button'
          >
            Withdraw
          </Button>
        )
      }
    />
  )
}

export default WithdrawAvailabilityRequestButton
