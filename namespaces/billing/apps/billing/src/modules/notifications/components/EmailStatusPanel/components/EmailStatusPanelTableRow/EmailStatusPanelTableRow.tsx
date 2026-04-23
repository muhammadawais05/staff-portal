import React, { FC, memo } from 'react'
import { Table, Typography, TypographyOverflow } from '@toptal/picasso'
import { camelCase } from 'lodash-es'
import { useTranslation } from 'react-i18next'
import { EmailDeliveryStatus } from '@staff-portal/graphql/staff'
import { EMPTY_DATA } from '@staff-portal/billing/src/_lib/helpers'
import CopyToClipBoardIcon from '@staff-portal/billing/src/components/CopyToClipboardIcon'
import { EnumKeysToCamelCase } from '@staff-portal/billing/src/@types/types'

import {
  InvoiceNotificationFragment,
  PaymentNotificationFragment
} from '../../data/getNotification.graphql.types'

const displayName = 'EmailStatusPanelTableRow'

interface Props {
  notificationStatus: PaymentNotificationFragment | InvoiceNotificationFragment
  isEven: boolean
}

const TableRow = Table.Row
const TableCell = Table.Cell

const EmailStatusPanelTableRow: FC<Props> = memo<Props>(
  ({ notificationStatus: { email, status, description }, isEven }) => {
    const { t: translate } = useTranslation('emailStatus')
    const transformedEmailStatus = camelCase(status) as EnumKeysToCamelCase<
      typeof EmailDeliveryStatus
    >

    return (
      <TableRow data-testid={displayName} stripeEven={isEven}>
        <TableCell>
          <TypographyOverflow as='span' data-testid={`${displayName}-email`}>
            {email}
          </TypographyOverflow>
          <CopyToClipBoardIcon content={email} />
        </TableCell>
        <TableCell>
          <Typography data-testid={`${displayName}-status`}>
            {translate(`table.row.status.${transformedEmailStatus}` as const)}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography data-testid={`${displayName}-description`}>
            {description || EMPTY_DATA}
          </Typography>
        </TableCell>
      </TableRow>
    )
  }
)

EmailStatusPanelTableRow.displayName = displayName

export default EmailStatusPanelTableRow
