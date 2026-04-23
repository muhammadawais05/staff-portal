import React, { FC, memo, useCallback, useState } from 'react'
import {
  Container,
  Table,
  Typography,
  TypographyOverflow
} from '@toptal/picasso'
import { SelectableTableRowCheckboxCell } from '@staff-portal/forms'
import LinkWrapper from '@staff-portal/billing/src/components/LinkWrapper'
import RowExpander from '@staff-portal/billing/src/components/RowExpander'
import { formatDateMed } from '@staff-portal/billing/src/_lib/dateTime'
import PaymentShortDescription from '@staff-portal/billing-widgets/src/modules/payment/components/PaymentShortDescription'
import { PaymentListItemFragment } from '@staff-portal/billing-widgets/src/modules/__fragments__/paymentListItemFragment.graphql.types'
import CommercialDocumentAmountWithColorAndTooltip from '@staff-portal/billing-widgets/src/modules/commercialDocument/components/CommercialDocumentAmountWithColorAndTooltip'

import * as S from './styles'

// @see https://github.com/toptal/platform/blob/64e94fa5dc8bc08a7303f426ebf2505e24b88d81/apq/actions/ba/payment/pay_from_search/modal/_select_payments.html.slim#

const displayName = 'PaymentSelectableListRow'

interface Props {
  index: number
  payment: PaymentListItemFragment
  handleOnSelect?: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => void
  selectionEnabled?: boolean
  isSelected?: boolean
}

const PaymentSelectableListRow: FC<Props> = memo<Props>(
  ({ index, payment, selectionEnabled }) => {
    const { createdOn, subjectObject, documentNumber, id, webResource } =
      payment

    const [isExpanded, setExpanded] = useState(false)
    const handleOnExpandClick = useCallback(
      () => setExpanded(!isExpanded),
      [setExpanded, isExpanded]
    )

    return (
      <Table.ExpandableRow
        content={
          <Container padded='small'>
            <Typography data-testid={`${displayName}-description`}>
              <PaymentShortDescription payment={payment} />
            </Typography>
          </Container>
        }
        expanded={isExpanded}
        stripeEven={Boolean(index % 2)}
        key={id}
      >
        {selectionEnabled && (
          <SelectableTableRowCheckboxCell
            data-testid={`${displayName}-checkbox`}
            fieldName='paymentIds'
            id={id}
          />
        )}
        <Table.Cell data-testid={`${displayName}-payment-id`}>
          <LinkWrapper href={webResource.url}>
            {`#${documentNumber}`}
          </LinkWrapper>
        </Table.Cell>

        <Table.Cell data-testid={`${displayName}-recipient`}>
          <LinkWrapper href={subjectObject.webResource.url}>
            <TypographyOverflow lines={2} color='inherit' disableTooltip>
              {subjectObject.webResource.text}
            </TypographyOverflow>
          </LinkWrapper>
        </Table.Cell>

        <Table.Cell css={S.rowCellAmount} data-testid={`${displayName}-amount`}>
          <CommercialDocumentAmountWithColorAndTooltip
            document={{
              amount: payment.amountWithCorrections,
              subjectObject: payment.subjectObject
            }}
            iconPosition='left'
          />
        </Table.Cell>
        <Table.Cell>
          {createdOn && (
            <Typography data-testid={`${displayName}-created-on-date`} as='p'>
              {formatDateMed(createdOn)}
            </Typography>
          )}
        </Table.Cell>
        <Table.Cell>
          <Container flex>
            <Container css={S.descriptionWrapper}>
              {!isExpanded && (
                <TypographyOverflow
                  lines={2}
                  size='xsmall'
                  as='p'
                  disableTooltip
                >
                  <PaymentShortDescription payment={payment} />
                </TypographyOverflow>
              )}
            </Container>
            <Container left={0.5}>
              <RowExpander
                value={id}
                testId={`${displayName}-expand`}
                handleOnClick={handleOnExpandClick}
                isExpanded={isExpanded}
              />
            </Container>
          </Container>
        </Table.Cell>
      </Table.ExpandableRow>
    )
  }
)

PaymentSelectableListRow.displayName = displayName

export default PaymentSelectableListRow
