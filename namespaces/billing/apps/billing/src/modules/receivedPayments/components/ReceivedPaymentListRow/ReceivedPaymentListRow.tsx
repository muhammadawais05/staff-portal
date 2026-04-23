import React, { FC, memo, SyntheticEvent } from 'react'
import {
  Container,
  Typography,
  Table,
  TypographyOverflow
} from '@toptal/picasso'
import { useTranslation } from 'react-i18next'
import RowExpander from '@staff-portal/billing/src/components/RowExpander'
import { formatDateMed } from '@staff-portal/billing/src/_lib/dateTime'
import { decodeId } from '@staff-portal/billing/src/_lib/helpers/apollo'
import CommercialDocumentStatus from '@staff-portal/billing-widgets/src/modules/commercialDocument/components/CommercialDocumentStatus'
import CommercialDocumentAmountWithColorAndTooltip from '@staff-portal/billing-widgets/src/modules/commercialDocument/components/CommercialDocumentAmountWithColorAndTooltip'
import PaymentShortDescription from '@staff-portal/billing-widgets/src/modules/payment/components/PaymentShortDescription'
import {
  CommercialDocumentType,
  useCommercialDocumentDebitedMessage,
  useListTableRowExpandState
} from '@staff-portal/billing-widgets/src/modules/commercialDocument/utils'

import { ReceivedPaymentListItemFragment } from '../../../__fragments__/receivedPaymentListItemFragment.graphql.types'
import * as S from './styles'
import ReceivedPaymentListRowActions from '../ReceivedPaymentListRowActions'

const displayName = 'ReceivedPaymentListRow'

const TableExpandableRow = Table.ExpandableRow
const TableCell = Table.Cell

interface PaymentListRowProps {
  handleOnActionClick: (event: SyntheticEvent<HTMLElement, Event>) => void
  payment: ReceivedPaymentListItemFragment
  isEven?: boolean
}

const ReceivedPaymentListRow: FC<PaymentListRowProps> =
  memo<PaymentListRowProps>(({ payment, isEven }) => {
    const {
      createdOn,
      paidAt,
      documentNumber,
      id,
      description,
      paymentGroupId
    } = payment
    const { t: translate } = useTranslation('paymentList')
    const debitedMessage = useCommercialDocumentDebitedMessage(payment)
    const paymentGroupLinkText =
      paymentGroupId &&
      translate('table.item.paymentGroupLink', {
        paymentGroupId: decodeId({
          type: 'paymentGroup',
          id: paymentGroupId
        })
      })

    const { isExpanded: isExpandedCheck, handleOnExpandClick } =
      useListTableRowExpandState()
    const isExpanded = isExpandedCheck(id)

    return (
      <TableExpandableRow
        content={
          <Container padded='small'>
            <Typography data-testid={`${displayName}-expanded-description`}>
              {description}
            </Typography>
          </Container>
        }
        expanded={isExpanded}
        stripeEven={isEven}
        data-testid={displayName}
      >
        <TableCell css={S.id}>
          {`#${documentNumber}`}
          {paymentGroupId && (
            <TypographyOverflow
              data-testid='payment-group-id'
              size='xsmall'
              tooltipContent={paymentGroupLinkText}
            >
              {paymentGroupLinkText}
            </TypographyOverflow>
          )}
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
          {debitedMessage && (
            <TypographyOverflow
              data-testid={`${displayName}-amount-debited`}
              size='xsmall'
            >
              {debitedMessage}
            </TypographyOverflow>
          )}
        </TableCell>
        <TableCell css={S.date}>
          {createdOn && (
            <Typography data-testid={`${displayName}-created-on-date`} as='p'>
              {formatDateMed(createdOn)}
            </Typography>
          )}
        </TableCell>
        <TableCell css={S.date}>
          {paidAt && (
            <Typography data-testid={`${displayName}-paid-on-date`} as='p'>
              {formatDateMed(paidAt)}
            </Typography>
          )}
        </TableCell>
        <TableCell css={S.description}>
          {!isExpanded && (
            <TypographyOverflow
              data-testid={`${displayName}-collapsed-description`}
              lines={2}
              size='xsmall'
            >
              <PaymentShortDescription payment={payment} />
            </TypographyOverflow>
          )}
        </TableCell>
        <TableCell css={S.action}>
          <Container flex justifyContent='flex-end'>
            <RowExpander
              value={id}
              testId={`${displayName}-expand`}
              handleOnClick={handleOnExpandClick}
              isExpanded={isExpanded}
            />
            <ReceivedPaymentListRowActions payment={payment} />
          </Container>
        </TableCell>
      </TableExpandableRow>
    )
  })

ReceivedPaymentListRow.displayName = displayName

export default ReceivedPaymentListRow
