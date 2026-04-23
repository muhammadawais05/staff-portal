import React, { ComponentProps } from 'react'
import { ColorType, Typography } from '@toptal/picasso'
import { ContractStatus } from '@staff-portal/graphql/staff'

type StatusInfo = {
  color: ColorType
  label: string
}

const statusInfoMap: Record<ContractStatus, StatusInfo> = {
  [ContractStatus.CREATED]: { color: 'yellow', label: 'Created' },
  [ContractStatus.RECIPIENT_SIGNED]: {
    color: 'yellow',
    label: 'Recipient Signed'
  },
  [ContractStatus.PRE_VERIFICATION]: {
    color: 'yellow',
    label: 'Pre Verification'
  },
  [ContractStatus.IN_VERIFICATION]: {
    color: 'yellow',
    label: 'In Verification'
  },
  [ContractStatus.SIGNED]: { color: 'green', label: 'Signed' },
  [ContractStatus.EXPIRED]: { color: 'red', label: 'Expired' },
  [ContractStatus.REMOVED]: { color: 'grey', label: 'Removed' }
}

type Props = {
  status: ContractStatus
  weight?: ComponentProps<typeof Typography>['weight']
}

const ContractStatusField = ({ status, weight }: Props) => {
  const statusInfo = statusInfoMap[status]

  return (
    <Typography color={statusInfo.color} weight={weight} size='medium'>
      {statusInfo.label}
    </Typography>
  )
}

export default ContractStatusField
