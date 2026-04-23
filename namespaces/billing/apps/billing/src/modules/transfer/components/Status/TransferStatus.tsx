import { Typography, ColorType } from '@toptal/picasso'
import React, { FC, memo } from 'react'
import { TransferStatus as Status } from '@staff-portal/graphql/staff'
import i18n from '@staff-portal/billing/src/utils/i18n'

const displayName = 'TransferStatus'

const getStatus = (key: string, color?: ColorType) => ({
  color,
  value: i18n.t(`transfers:status.${key}`)
})

const transferStatus = {
  [Status.SUCCEEDED]: getStatus(Status.SUCCEEDED, 'green'),
  [Status.REFUNDED]: getStatus(Status.REFUNDED, 'yellow'),
  [Status.PENDING]: getStatus(Status.PENDING, 'yellow'),
  [Status.PENDING_REFUND]: getStatus(Status.PENDING_REFUND, 'yellow'),
  [Status.FAILED]: getStatus(Status.FAILED, 'red'),
  [Status.FAILED_REFUND]: getStatus(Status.FAILED_REFUND, 'red'),
  [Status.REVERTED]: getStatus(Status.REVERTED, 'dark-grey'),
  [Status.CANCELLED]: getStatus(Status.CANCELLED, 'dark-grey')
}

interface Props {
  status: Status
}

export const getTransferStatus = (status: Status) =>
  transferStatus[status] ?? getStatus('none', 'dark-grey')

const TransferStatus: FC<Props> = memo<Props>(({ status }) => {
  const { value: statusValue, color: statusColor } = getTransferStatus(status)

  return (
    <Typography color={statusColor} data-testid='status'>
      {statusValue}
    </Typography>
  )
})

TransferStatus.displayName = displayName

export default TransferStatus
