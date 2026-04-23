import React, { FC, memo } from 'react'
import { Table, Typography, TypographyOverflow } from '@toptal/picasso'
import { SelectableTableRowCheckboxCell } from '@staff-portal/forms'
import LinkWrapper from '@staff-portal/billing/src/components/LinkWrapper'
import { formatDateMed } from '@staff-portal/billing/src/_lib/dateTime'
import CommercialDocumentAmountWithColorAndTooltip from '@staff-portal/billing-widgets/src/modules/commercialDocument/components/CommercialDocumentAmountWithColorAndTooltip'

import * as S from './styles'
import { PaymentGroupItemFragment } from '../../../../data'

const displayName = 'PaymentGroupSelectableListRow'

interface Props {
  index: number
  paymentGroup: PaymentGroupItemFragment
  handleOnSelect?: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => void
  selectionEnabled?: boolean
  isSelected?: boolean
}
const PaymentGroupSelectableListRow: FC<Props> = memo<Props>(
  ({ index, paymentGroup, selectionEnabled }) => {
    const { createdOn, id, number, subject, webResource } = paymentGroup

    return (
      <Table.Row stripeEven={Boolean(index % 2)} key={id}>
        {selectionEnabled && (
          <SelectableTableRowCheckboxCell
            data-testid={`${displayName}-checkbox`}
            fieldName='paymentGroupIds'
            id={id}
          />
        )}
        <Table.Cell data-testid={`${displayName}-paymentGroup-id`}>
          <LinkWrapper href={webResource.url}>{`#${number}`}</LinkWrapper>
        </Table.Cell>

        <Table.Cell data-testid={`${displayName}-recipient`}>
          <LinkWrapper href={subject.webResource.url}>
            <TypographyOverflow lines={2} color='inherit' disableTooltip>
              {subject.webResource.text}
            </TypographyOverflow>
          </LinkWrapper>
        </Table.Cell>

        <Table.Cell css={S.rowCellAmount} data-testid={`${displayName}-amount`}>
          <CommercialDocumentAmountWithColorAndTooltip
            document={{
              amount: paymentGroup.amount,
              subjectObject: paymentGroup.subject
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
      </Table.Row>
    )
  }
)

PaymentGroupSelectableListRow.displayName = displayName

export default PaymentGroupSelectableListRow
