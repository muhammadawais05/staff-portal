import React, { FC, SyntheticEvent, memo } from 'react'
import {
  Amount,
  Container,
  Table,
  Typography,
  TypographyOverflow
} from '@toptal/picasso'
import { useTranslation } from 'react-i18next'
import { formatAmount } from '@toptal/picasso/utils'
import { CreditCardBillingOption } from '@staff-portal/graphql/staff'
import { EMPTY_DATA } from '@staff-portal/billing/src/_lib/helpers'
import { decodeId } from '@staff-portal/billing/src/_lib/helpers/apollo'
import { formatDateMed } from '@staff-portal/billing/src/_lib/dateTime'
import en from '@staff-portal/billing/src/translations/en'
import { getCommercialDocumentPaymentMethod } from '@staff-portal/billing-widgets/src/modules/commercialDocument/utils'

import { TransferFragment } from '../../../__fragments__/transferFragment.graphql.types'
import TableRowActions from '../TableRowActions'
import TransferStatus from '../Status'

const displayName = 'TransfersTableRow'

interface Props {
  onTransferActionClick: (e: SyntheticEvent<HTMLElement>) => void
  transfer: TransferFragment
  isEven: boolean
}

const TableRow = Table.Row
const TableCell = Table.Cell

const TransfersTableRow: FC<Props> = memo<Props>(
  ({
    transfer: {
      amount,
      billingOption,
      description,
      effectiveDate,
      feesTotalAmount,
      gateway,
      id,
      operations,
      paymentMethod,
      status
    },
    onTransferActionClick,
    isEven
  }) => {
    const { t: translate } = useTranslation(['transfers', 'paymentMethod'])
    const transferDecodedId = decodeId({ id, type: 'transfer' })
    const collectionFees =
      +feesTotalAmount > 0 &&
      translate('transfers:table.collectionFees', {
        amount: formatAmount({ amount: feesTotalAmount })
      })
    const { i18Key, last4Digits, type } = getCommercialDocumentPaymentMethod({
      rawPaymentMethod: paymentMethod,
      gateway,
      billingOption: billingOption as CreditCardBillingOption
    })
    const stringPaymentMethod = translate(
      `paymentMethod:${i18Key as keyof typeof en['paymentMethod']}` as const,
      {
        last4Digits,
        type,
        defaultValue: EMPTY_DATA
      }
    )

    return (
      <TableRow
        data-testid='invoice-transfer-table-row'
        key={transferDecodedId}
        stripeEven={isEven}
      >
        <TableCell>
          <TransferStatus status={status} />
        </TableCell>
        <TableCell data-testid='payment-method'>
          <TypographyOverflow color='inherit' weight='semibold'>
            {stringPaymentMethod}
          </TypographyOverflow>
        </TableCell>
        <TableCell>
          <Amount
            align='right'
            amount={amount}
            as='p'
            data-testid='amount'
            inline={false}
            weight='semibold'
          />
          {collectionFees && (
            <Typography
              data-testid='collectionFees'
              align='right'
              size='xsmall'
            >
              {collectionFees}
            </Typography>
          )}
        </TableCell>
        <TableCell>
          <Typography data-testid='date' weight='semibold'>
            {formatDateMed(effectiveDate)}
          </Typography>
        </TableCell>
        <TableCell>
          <Container
            alignItems='center'
            flex
            direction='row'
            justifyContent='space-between'
          >
            <TypographyOverflow color='inherit' data-testid='details'>
              {description}
            </TypographyOverflow>
            <TableRowActions
              operations={operations}
              id={transferDecodedId}
              onTransferActionClick={onTransferActionClick}
            />
          </Container>
        </TableCell>
      </TableRow>
    )
  }
)

TransfersTableRow.displayName = displayName

export default TransfersTableRow
