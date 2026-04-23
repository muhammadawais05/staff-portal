import { Amount, Container, Table } from '@toptal/picasso'
import React, { FC, memo, SyntheticEvent } from 'react'
import WebResourceLinkWrapper from '@staff-portal/billing/src/components/WebResourceLinkWrapper'
import { formatDateMed } from '@staff-portal/billing/src/_lib/dateTime'

import PaymentGroupStatus from '../PaymentGroupStatus'
import PaymentGroupRowAction from '../PaymentGroupRowAction'
import { PaymentGroupItemFragment } from '../../data'
import * as S from './styles'

const displayName = 'PaymentGroupListTableRow'

interface Props {
  group: PaymentGroupItemFragment
  isEven: boolean
  handleOnActionClick: (event: SyntheticEvent<HTMLElement, Event>) => void
}

const PaymentGroupListTableRow: FC<Props> = memo<Props>(
  ({ group, isEven, handleOnActionClick }) => {
    const { createdOn, number, subject, amount, webResource } = group

    return (
      <Table.Row
        data-testid={`${displayName}-payment-group`}
        stripeEven={isEven}
      >
        <Table.Cell data-testid={`${displayName}-number`}>
          <WebResourceLinkWrapper
            inline
            webResource={webResource}
            defaultText={`#${number}`}
          />
        </Table.Cell>
        <Table.Cell data-testid={`${displayName}-status`}>
          <PaymentGroupStatus group={group} />
        </Table.Cell>
        <Table.Cell data-testid={`${displayName}-payee`}>
          <WebResourceLinkWrapper inline webResource={subject.webResource} />
        </Table.Cell>
        <Table.Cell data-testid={`${displayName}-amount`} css={S.amountCell}>
          <Amount amount={amount} />
        </Table.Cell>
        <Table.Cell data-testid={`${displayName}-date`} css={S.dateCell}>
          {formatDateMed(createdOn)}
        </Table.Cell>
        <Table.Cell css={S.action}>
          <Container flex justifyContent='flex-end'>
            <PaymentGroupRowAction
              group={group}
              handleOnClick={handleOnActionClick}
            />
          </Container>
        </Table.Cell>
      </Table.Row>
    )
  }
)

PaymentGroupListTableRow.displayName = displayName

export default PaymentGroupListTableRow
