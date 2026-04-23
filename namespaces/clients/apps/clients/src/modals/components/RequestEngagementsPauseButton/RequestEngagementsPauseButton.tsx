import React from 'react'
import { Operation as OperationType } from '@staff-portal/graphql/staff'
import { Operation } from '@staff-portal/operations'
import { Button, ButtonProps } from '@toptal/picasso'
import { useModal } from '@staff-portal/modals-service'

import RequestEngagementsPauseModal from '../RequestEngagementsPauseModal'

type Props = Omit<
  ButtonProps,
  'children' | 'variant' | 'onClick' | 'disabled'
> & {
  companyId: string
  operation?: OperationType
}

const RequestEngagementsPauseButton = ({
  companyId,
  operation,
  ...props
}: Props) => {
  const { showModal } = useModal(RequestEngagementsPauseModal, {
    companyId
  })

  return (
    <Operation
      inline={false}
      operation={operation}
      render={disabled => (
        <Button
          disabled={disabled}
          data-testid='request-engagements-pause-button'
          onClick={showModal}
          variant='negative'
          {...props}
        >
          Request Engagements Pause
        </Button>
      )}
    />
  )
}

export default RequestEngagementsPauseButton
