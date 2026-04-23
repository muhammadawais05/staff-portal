import React, { FC, memo } from 'react'
import { camelCase } from 'lodash-es'
import { Typography } from '@toptal/picasso'
import { useTranslation } from 'react-i18next'

import { getPaymentGroupStatusColor } from '../../utils'
import { PaymentGroupItemFragment } from '../../data'

interface Props {
  group: PaymentGroupItemFragment
}

const displayName = 'PaymentGroupStatus'

type TransformedPaymentGroupStatus =
  | 'pendingPayment'
  | 'pendingCancel'
  | 'paid'
  | 'outstanding'

const PaymentGroupStatus: FC<Props> = memo(({ group: { status } }) => {
  const { t: translate } = useTranslation('paymentGroupList')
  const transformedGroupStatus = camelCase(
    status
  ) as TransformedPaymentGroupStatus

  return (
    <Typography
      data-testid={`${displayName}-content`}
      color={getPaymentGroupStatusColor(status)}
      weight='semibold'
    >
      {translate(`table.item.status.${transformedGroupStatus}` as const)}
    </Typography>
  )
})

PaymentGroupStatus.displayName = displayName

export default PaymentGroupStatus
