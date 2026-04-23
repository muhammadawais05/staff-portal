import React, { memo } from 'react'
import { Operation, OperationType } from '@staff-portal/operations'
import {
  UpdateTopShieldQuarterModal,
  TopShieldApplicationQuarterFragment
} from '@staff-portal/talents-top-shield'
import { useModal } from '@staff-portal/modals-service'
import { Button } from '@toptal/picasso'

type Props = Pick<
  TopShieldApplicationQuarterFragment,
  'id' | 'startDate' | 'endDate' | 'paymentEndDate'
> & {
  operation: OperationType
}

const UpdateQuarterButton = ({
  id,
  startDate,
  endDate,
  paymentEndDate,
  operation
}: Props) => {
  const { showModal } = useModal(UpdateTopShieldQuarterModal, {
    id,
    startDate,
    endDate,
    paymentEndDate
  })

  return (
    <Operation
      operation={operation}
      render={disabled => (
        <Button
          variant='secondary'
          size='small'
          disabled={disabled}
          onClick={showModal}
          data-testid='updateQuarterButton'
        >
          Update Quarter
        </Button>
      )}
    />
  )
}

export default memo(UpdateQuarterButton)
