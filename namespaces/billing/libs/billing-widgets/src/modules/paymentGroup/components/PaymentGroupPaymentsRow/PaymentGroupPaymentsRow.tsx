import React, { FC, memo, SyntheticEvent } from 'react'
import { Table, Typography, TypographyOverflow } from '@toptal/picasso'
import WebResourceLinkWrapper from '@staff-portal/billing/src/components/WebResourceLinkWrapper'
import { formatDateMed } from '@staff-portal/billing/src/_lib/dateTime'

import { PaymentListItemFragment } from '../../../__fragments__/paymentListItemFragment.graphql.types'
import CommercialDocumentStatus from '../../../commercialDocument/components/CommercialDocumentStatus'
import { CommercialDocumentType } from '../../../commercialDocument/utils'
import CommercialDocumentAmountWithColorAndTooltip from '../../../commercialDocument/components/CommercialDocumentAmountWithColorAndTooltip'
import PaymentShortDescription from '../../../payment/components/PaymentShortDescription'
import PaymentGroupPaymentsActions from '../PaymentGroupPaymentsActions'
import { PaymentGroupDetailsPaymentsOperationsFragment } from '../../data/getPaymentGroupDetailsPayments.graphql.types'
import { usePaymentRemovedStatus } from './usePaymentRemovedStatus'
import * as S from './styles'

const displayName = 'PaymentGroupPaymentsRow'

interface Props {
  handleOnActionClick: (event: SyntheticEvent<HTMLElement, Event>) => void
  payment: PaymentListItemFragment & {
    operations: PaymentGroupDetailsPaymentsOperationsFragment
  }
  paymentGroupId: string
  isEven: boolean
}

const TableRow = Table.Row
const TableCell = Table.Cell

const PaymentGroupPaymentsRow: FC<Props> = memo<Props>(
  ({ handleOnActionClick, payment, paymentGroupId, isEven }) => {
    const { createdOn, documentNumber, webResource } = payment
    const { paymentRemoved } = usePaymentRemovedStatus(payment)

    return (
      <TableRow
        stripeEven={isEven}
        css={S.row(paymentRemoved)}
        data-testid={`${displayName}-payment`}
      >
        <TableCell css={S.id} data-testid={`${displayName}-payment-id`}>
          <WebResourceLinkWrapper
            inline
            webResource={webResource}
            defaultText={`#${documentNumber}`}
          />
        </TableCell>
        <TableCell css={S.status} data-testid={`${displayName}-status`}>
          <CommercialDocumentStatus
            document={payment}
            nodeType={CommercialDocumentType.payment}
            showTooltip={false}
          />
        </TableCell>
        <TableCell css={S.amount} data-testid={`${displayName}-amount`}>
          <CommercialDocumentAmountWithColorAndTooltip
            document={{
              amount: payment.amountWithCorrections,
              subjectObject: payment.subjectObject
            }}
            iconPosition='left'
          />
        </TableCell>
        <TableCell css={S.date}>
          {createdOn && (
            <Typography data-testid={`${displayName}-created-on-date`} as='p'>
              {formatDateMed(createdOn)}
            </Typography>
          )}
        </TableCell>
        <TableCell css={S.description}>
          <TypographyOverflow lines={2} size='xsmall' disableTooltip>
            <PaymentShortDescription payment={payment} />
          </TypographyOverflow>
        </TableCell>
        <TableCell css={S.action}>
          <PaymentGroupPaymentsActions
            payment={payment}
            paymentGroupId={paymentGroupId}
            paymentRemoved={paymentRemoved}
            handleOnActionClick={handleOnActionClick}
          />
        </TableCell>
      </TableRow>
    )
  }
)

export default PaymentGroupPaymentsRow
