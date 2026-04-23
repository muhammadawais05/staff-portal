import { Amount } from '@toptal/picasso'
import React, { ComponentProps } from 'react'
import { omit } from 'lodash-es'
import { DocumentStatus } from '@staff-portal/graphql/staff'
import { getDocumentStatusColor } from '@staff-portal/billing/src/_lib/helpers/billing'

const displayName = 'AmountWithStatusColor'

interface Props extends ComponentProps<typeof Amount> {
  status: DocumentStatus
}

export const AmountWithStatusColor = ({ status, ...amountProps }: Props) => {
  const statusColor = getDocumentStatusColor(status)

  return <Amount color={statusColor} {...omit(amountProps, ['color'])} />
}

AmountWithStatusColor.displayName = displayName

export default AmountWithStatusColor
