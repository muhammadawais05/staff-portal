import React, { FC, memo, SyntheticEvent } from 'react'
import {
  Container,
  Typography,
  Table,
  TypographyOverflow
} from '@toptal/picasso'
import { useTranslation } from 'react-i18next'
import LinkWrapper from '@staff-portal/billing/src/components/LinkWrapper'
import RowExpander from '@staff-portal/billing/src/components/RowExpander'
import { formatDateMed } from '@staff-portal/billing/src/_lib/dateTime'
import { decodeId } from '@staff-portal/billing/src/_lib/helpers/apollo'
import { PaymentListItemFragment } from '@staff-portal/billing-widgets/src/modules/__fragments__/paymentListItemFragment.graphql.types'
import CommercialDocumentStatus from '@staff-portal/billing-widgets/src/modules/commercialDocument/components/CommercialDocumentStatus'
import CommercialDocumentAmountWithColorAndTooltip from '@staff-portal/billing-widgets/src/modules/commercialDocument/components/CommercialDocumentAmountWithColorAndTooltip'
import {
  CommercialDocumentType,
  useCommercialDocumentDebitedMessage,
  useCommercialDocumentDueMessage,
  useListTableRowExpandState
} from '@staff-portal/billing-widgets/src/modules/commercialDocument/utils'
import PaymentShortDescription from '@staff-portal/billing-widgets/src/modules/payment/components/PaymentShortDescription'

import * as S from './styles'
import PaymentRowAction from '../PaymentRowAction'

// @see https://github.com/toptal/platform/blob/master/app/views/platform/staff_space/payments/_payment.html.slim

const displayName = 'PaymentListRow'

const TableExpandableRow = Table.ExpandableRow
const TableCell = Table.Cell

export interface PaymentListRowProps {
  handleOnActionClick: (event: SyntheticEvent<HTMLElement, Event>) => void
  payment: PaymentListItemFragment
  isEven?: boolean
}

const PaymentListRow: FC<PaymentListRowProps> = memo<PaymentListRowProps>(
  ({ handleOnActionClick, payment, isEven }) => {
    const {
      createdOn,
      subjectObject,
      documentNumber,
      id,
      description,
      webResource,
      paymentGroup
    } = payment
    const { t: translate } = useTranslation('paymentList')
    const dueMessage = useCommercialDocumentDueMessage(payment)
    const debitedMessage = useCommercialDocumentDebitedMessage(payment)
    const paymentGroupLinkText =
      paymentGroup &&
      translate('table.item.paymentGroupLink', {
        paymentGroupId: decodeId({
          type: 'paymentGroup',
          id: paymentGroup.id
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
          <LinkWrapper
            href={webResource.url}
            data-testid={`${displayName}-payment-id-link`}
          >
            {`#${documentNumber}`}
          </LinkWrapper>
          {paymentGroup && (
            <TypographyOverflow tooltipContent={paymentGroupLinkText}>
              <LinkWrapper
                href={paymentGroup.webResource.url}
                data-testid={`${displayName}-pglink`}
              >
                {paymentGroupLinkText}
              </LinkWrapper>
            </TypographyOverflow>
          )}
        </TableCell>
        <TableCell css={S.status} data-testid={`${displayName}-status`}>
          <CommercialDocumentStatus
            document={payment}
            nodeType={CommercialDocumentType.payment}
          />
        </TableCell>
        <TableCell css={S.recipient} data-testid={`${displayName}-recipient`}>
          <LinkWrapper href={subjectObject.webResource.url}>
            <TypographyOverflow lines={2} color='inherit' disableTooltip>
              {subjectObject.webResource.text}
            </TypographyOverflow>
          </LinkWrapper>
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
          {dueMessage && (
            <TypographyOverflow
              data-testid={`${displayName}-due-date`}
              size='xsmall'
            >
              {dueMessage}
            </TypographyOverflow>
          )}
        </TableCell>
        <TableCell css={S.description}>
          {!isExpanded && (
            <TypographyOverflow
              data-testid={`${displayName}-collapsed-description`}
              lines={2}
              size='xsmall'
              disableTooltip
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
            <PaymentRowAction
              payment={payment}
              handleOnClick={handleOnActionClick}
            />
          </Container>
        </TableCell>
      </TableExpandableRow>
    )
  }
)

PaymentListRow.displayName = displayName

export default PaymentListRow
