import React, { useMemo } from 'react'
import { DetailedList } from '@staff-portal/ui'
import { NO_VALUE } from '@staff-portal/config'

import { getTransferRequestItems } from '../../utils'
import { ClientTransferRoleRequestFragment } from '../../data'

type Props = {
  transferRequest: ClientTransferRoleRequestFragment
}

const TransferRequestList = ({ transferRequest }: Props) => {
  const items = useMemo(
    () => getTransferRequestItems(transferRequest),
    [transferRequest]
  )

  return (
    // eslint-disable-next-line @toptal/davinci/no-deprecated-props
    <DetailedList defaultValue={NO_VALUE} labelColumnWidth={10} items={items} />
  )
}

export default TransferRequestList
